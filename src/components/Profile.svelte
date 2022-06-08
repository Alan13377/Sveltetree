<script>
	import { db } from '$lib/firebase';
	import { auth } from '$lib/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { user, isLoggedIn } from '../stores/store';
	import { colorStore } from '../stores/colorStore';

	import { collection, onSnapshot, query, where } from 'firebase/firestore';

	let profile = [];

	//Obtener datos
	onAuthStateChanged(auth, async (authUser) => {
		$user = authUser;

		if ($user) {
			onSnapshot(
				query(collection(db, 'users'), where('uid', '==', $user.uid)),
				(querySnapshot) => {
					profile = querySnapshot.docs.map((doc) => {
						return { ...doc.data(), id: doc.id };
					});
				},
				(error) => {
					console.log(error);
				}
			);
		}
	});
</script>

{#if $isLoggedIn}
	<div class="profile">
		{#each profile as profi}
			<img src={profi.picture} alt={profi.name} />
			<p>Username: {profi.username}</p>
			<p>Ver pagina: <a target="blank" href={`/user/${profi.username}-${profi.uid}`}>click</a></p>
		{/each}
	</div>
{/if}

<style>
	.profile {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 50px;
	}
	a {
		text-decoration: none;
		color: aliceblue;
	}
</style>
