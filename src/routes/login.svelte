<script>
	import { auth } from '$lib/firebase';
	import { getAdditionalUserInfo, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
	import { user, isLoggedIn } from '../stores/store';
	import { addDoc, collection } from 'firebase/firestore';

	import { db } from '$lib/firebase';
	import { goto } from '$app/navigation';

	const login = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const response = await signInWithPopup(auth, provider);
			const { isNewUser } = getAdditionalUserInfo(response);
			$user = response.user;
			$isLoggedIn = true;
			goto('/');
			if (isNewUser) {
				newRegister($user);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const newRegister = async () => {
		try {
			await addDoc(collection(db, 'users'), {
				name: $user.displayName,
				picture: $user.photoURL,
				uid: $user.uid,
				username: $user.displayName.replace(/ /g, '')
			});
		} catch (error) {
			console.error(error);
		}
	};
</script>

<h1>Login</h1>
<button on:click={login}>Iniciar Sesion con Google</button>
