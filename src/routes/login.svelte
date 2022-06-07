<script>
	import { auth } from '$lib/firebase';
	import { getAdditionalUserInfo, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
	import { user, isLoggedIn } from '../stores/store';
	import { addDoc, collection } from 'firebase/firestore';

	import { db } from '$lib/firebase';
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';
	import { onAuthStateChanged } from 'firebase/auth';

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

	onAuthStateChanged(auth, async (authUser) => {
		$user = authUser;
		if ($user) {
			if (browser) {
				if ($isLoggedIn == true) {
					goto('/', { replace: true });
				}
			}
		}
	});
</script>

<div class="login">
	<div class="container-login">
		<h1>Login</h1>
		<button class="login__google" on:click={login}>Iniciar Sesion con Google</button>
	</div>
</div>

<style>
	.login {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.login__google {
		background-color: #4285f4;
		border-radius: 5px;
		border: none;
		color: white;
		padding: 15px 32px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		margin: 4px 2px;
		cursor: pointer;
	}
	.container-login {
		width: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background-color: #f2f2f2;
	}
</style>
