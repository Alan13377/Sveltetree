<script>
	import { db } from '$lib/firebase';
	import { auth } from '$lib/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { user, isLoggedIn } from '../stores/store';
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
	{#each profile as profi}
		<img src={profi.picture} alt={profi.name} />
		<p>{profi.username}</p>
		<p>Ver pagina: <a href={`/user/${profi.username}`}>pagina</a></p>
	{/each}
{/if}
