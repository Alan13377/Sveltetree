<script>
	import { db } from '$lib/firebase';

	import { collection, onSnapshot, query, where } from 'firebase/firestore';

	let profile = [];
	let Links = [];
	export let username;
	export let uid;

	//Obtener datos

	onSnapshot(
		query(collection(db, 'users'), where('username', '==', username)),
		query(collection(db, 'links'), where('uid', '==', uid)),
		(querySnapshot) => {
			profile = querySnapshot.docs.map((doc) => {
				return { ...doc.data(), id: doc.id };
			});
		},
		(error) => {
			console.log(error);
		}
	);
	onSnapshot(
		query(collection(db, 'links'), where('uid', '==', uid)),
		(querySnapshot) => {
			Links = querySnapshot.docs.map((doc) => {
				return { ...doc.data(), id: doc.id };
			});
		},
		(error) => {
			console.log(error);
		}
	);
</script>

<div>
	{#each profile as profi}
		<img src={profi.picture} alt={profi.name} />
		<p>{profi.username}</p>
	{/each}
</div>
<div class="links__container">
	{#each Links as link}
		<div class="link__info">
			<div class="link__icon">
				<i class={`fa-brands ${link.icon}`} />
			</div>
			<a class="link" target="blank" href={link.url}>
				{link.title}
			</a>
		</div>
	{/each}
</div>

<style>
	.links__container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		max-width: 100%;
	}

	.link__info {
		display: flex;
		justify-content: center;
		gap: 1rem;
		align-items: center;
		cursor: pointer;
		text-align: center;
		border-radius: 30px;
		background-color: #6d0202;
		width: 100%;
		padding: 30px;
		margin: 10px 90px;
		box-shadow: 0px 0px 10px #6d0202;
	}

	.link {
		color: #fff;
		font-weight: bolder;
		font-size: 20px;
	}
	.link__icon {
		font-size: 30px;
		color: #fff;
	}
</style>
