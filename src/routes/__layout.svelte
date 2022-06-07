<script>
	import { signOut, onAuthStateChanged } from 'firebase/auth';

	import { auth } from '$lib/firebase';
	import { user, isLoggedIn } from '../stores/store';

	import Navbar from '../components/Navbar.svelte';

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
	});
</script>

<div style="--theme-color:{$colorStore}">
	<Navbar {logout} />
	<main class="container">
		<slot />
	</main>
</div>
