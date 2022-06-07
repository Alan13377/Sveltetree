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
{#each Links as link}
	<p>{link.title}</p>
	<p>{link.url}</p>
{/each}
