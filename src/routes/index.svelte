<script>
	import { db } from '$lib/firebase';
	import { auth } from '$lib/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { user, isLoggedIn } from '../stores/store';
	import { isOverlayOpen } from '../stores/modal';
	import {
		addDoc,
		collection,
		deleteDoc,
		doc,
		onSnapshot,
		query,
		updateDoc,
		where
	} from 'firebase/firestore';
	import Profile from '../components/Profile.svelte';
	import Dialog from '../components/Dialog.svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';

	let title = '';
	let url = '';
	let icon = '';
	let links = [];
	let form = false;
	let currentId = '';
	let regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

	///Formulario

	const handleSubmit = () => {
		if (title == '' || icon == '' || (url == '' && !url.match(regex))) {
			alert('Todos los campos son requeridos');
		} else {
			try {
				form ? addLink() : updateLink();
			} catch (error) {
				console.error(error);
			}
		}
		title = '';
		url = '';
		icon = '';
	};

	const addLink = async () => {
		try {
			await addDoc(collection(db, 'links'), {
				title: title,
				url: url,
				icon: icon,
				uid: $user.uid
			});
		} catch (error) {
			console.error(error);
		}
	};

	const updateLink = async () => {
		try {
			await updateDoc(doc(db, 'links', currentId), {
				title: title,
				url: url
			});
		} catch (error) {
			console.error(error);
		}
	};

	const deleteLink = async (id) => {
		try {
			await deleteDoc(doc(db, 'links', id));
		} catch (error) {
			console.error(error);
		}
	};

	//Obtener datos
	onAuthStateChanged(auth, async (authUser) => {
		$user = authUser;
		if ($user) {
			onSnapshot(
				query(collection(db, 'links'), where('uid', '==', $user.uid)),
				(querySnapshot) => {
					links = querySnapshot.docs.map((doc) => {
						return { ...doc.data(), id: doc.id };
					});
				},
				(error) => {
					console.log(error);
				}
			);
		} else {
			if (browser) {
				goto('/login');
			}
		}
	});

	const openAddForm = async () => {
		form = true;
		isOverlayOpen.set(true);
	};
	const openEditForm = async (currentLink) => {
		form = false;
		title = currentLink.title;
		url = currentLink.url;
		currentId = currentLink.id;
		isOverlayOpen.set(true);
	};
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>
{#if $isOverlayOpen}
	<Dialog>
		<div class="contenido__form">
			<form on:submit|preventDefault={handleSubmit}>
				<div class="campo">
					<label class="campo__label" for="title">Titulo</label>
					<input
						class="campo__field"
						bind:value={title}
						type="text"
						name="title"
						id="title"
						placeholder="Titulo"
					/>
				</div>
				<div class="campo">
					<label class="campo__label" for="url">Url</label>
					<input
						class="campo__field"
						bind:value={url}
						type="text"
						name="url"
						id="url"
						placeholder="url"
					/>
				</div>
				<div class="campo">
					<label class="campo__label" for="icon">Icono</label>
					<input
						class="campo__field"
						bind:value={icon}
						type="text"
						name="icon"
						id="icon"
						placeholder="fa-tiktok"
					/>
				</div>
				<button class="btn btn-agregar">Guardar</button>
			</form>
		</div>
	</Dialog>
{/if}

<div class="contenido__principal">
	<div class="contenido__profile">
		<Profile />
	</div>
	<h1>Agrega un nuevo Link</h1>
	<button class="btn btn-agregar" on:click={openAddForm}>Agregar Link</button>
</div>

<div class="links">
	<div class="links">
		{#if $isLoggedIn}
			{#each links as link}
				<div class="link__info">
					<p>{link.title}</p>
					<p>{link.url}</p>
					<div>
						<i on:click={openEditForm(link)} class="material-icons edit">edit</i>
						<i on:click={deleteLink(link.id)} class="material-icons delete">delete</i>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style>
	.contenido__principal {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.contenido__profile {
		margin: 0 auto;
		height: auto;
	}

	.contenido__form {
		padding: 40px;
	}

	.campo {
		margin-bottom: 2rem;
	}

	.campo__label {
		flex: 0 0 9rem;
		text-align: right;
		padding-right: 2rem;
		font-weight: bold;
		font-size: 15px;
	}

	.campo__field {
		display: block;
		width: 100%;
		padding: 15px;
		flex: 1;
		border: 1px solid #ccc;
		border-radius: 5px;
	}

	.btn {
		margin-top: 20px;
		color: #fff;
		border: none;
		padding: 15px;
		border-radius: 5px;
		cursor: pointer;
		font-size: 15px;
		font-weight: bold;
	}

	@media (max-width: 768px) {
		.btn {
			width: 100%;
		}
	}
	.btn-agregar {
		background-color: #0003b8;
	}

	.links {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.link__info {
		border: 1px solid #ccc;
		width: 100%;
		padding: 30px;
		margin: 20px;
	}
	i {
		cursor: pointer;
	}
	.edit {
		color: #0003b8;
	}
	.delete {
		color: #ff0000;
	}
</style>
