<script>
	import { signOut, onAuthStateChanged } from 'firebase/auth';

	import { auth } from '$lib/firebase';
	import { user, isLoggedIn } from '../stores/store';
	import Navbar from '../components/Navbar.svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';
	import '../App.css';
	const logout = async () => {
		try {
			await signOut(auth);
			$isLoggedIn = false;
			$user = {};
		} catch (error) {
			console.error(error);
		}
	};

	//Mantener Sesion
	onAuthStateChanged(auth, async (authUser) => {
		$user = authUser;
		$isLoggedIn = !!authUser;
		if (browser) {
			if ($isLoggedIn != true) {
				goto('/login', { replace: true });
			}
			if ($isLoggedIn != false) {
				goto('/', { replace: true });
			}
		}
	});
</script>

<Navbar {logout} />
<main class="container">
	<slot />
</main>
