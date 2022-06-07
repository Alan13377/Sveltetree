<script>
	import { isLoggedIn, user } from '../stores/store';

	export let logout;
</script>

<div class="navbar">
	<div>
		<a class="navbar__titulo" href="/"> <h1>SvelteTree</h1></a>
	</div>
	<nav class="navegacion">
		{#if $isLoggedIn}
			<a class="navegacion__enlace" href="/">Dashboard</a>
			<a class="navegacion__enlace" href="/login" on:click={logout}>Salir</a>
		{:else}
			<a href="/login">Login</a>
		{/if}
	</nav>
</div>

<style>
	.navbar {
		background: #333;
		padding: 1rem;
		margin-bottom: 30px;
	}
	.navbar__titulo {
		color: #fff;
		text-align: center;
		text-decoration: none;
	}
	@media (min-width: 768px) {
		.navbar {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 1.4rem;
			background: linear-gradient(to right, rgb(88, 0, 88), rgba(224, 191, 240, 0.863));
		}
	}
	@media (min-width: 768px) {
		.navegacion {
			display: flex;
			gap: 2rem;
		}
	}
	.navegacion__enlace {
		display: block;
		color: #fff;
		text-decoration: none;
		cursor: pointer;
		text-align: center;
		font-size: 1.3rem;
	}
</style>
