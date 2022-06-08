<script>
	import { signOut, onAuthStateChanged } from 'firebase/auth';

	import { auth } from '$lib/firebase';
	import { user, isLoggedIn } from '../stores/store';
	import { colorStore } from '../stores/colorStore';

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

<body>
	<div>
		<!-- style:background-color={$colorStore} -->
		<Navbar {logout} />
		<main class="container">
			<slot />
		</main>
	</div>
</body>

<style>
	body {
		background-color: #000000;
		background-image: linear-gradient(147deg, #000000 0%, #04619f 74%);
		color: #fff;
	}
</style>
