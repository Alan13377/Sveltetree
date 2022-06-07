<script>
	import { addDoc, collection, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
	import { onDestroy } from 'svelte';
	export async function load({ params }) {
		const { username } = params;
		let userData = [];
		//Obtener datos
		//Obtener datos
		const unsub = onSnapshot(
			query(collection(db, 'users'), where('uid', '==', username)),
			//Convertir datos
			(querySnapshot) => {
				userData = querySnapshot.docs.map((doc) => {
					return { ...doc.data(), id: doc.id };
				});
				console.log(userData);
			},
			(error) => {
				console.log(error);
			}
		);
		onDestroy(unsub);
	}
</script>
