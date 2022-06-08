<script context="module">
	export async function load({ params }) {
		const username = params.username;
		const uid = params.uid;

		return {
			props: {
				username,
				uid
			}
		};
	}
</script>

<script>
	import PublicProfile from '../../components/PublicProfile.svelte';
	export let username;
	export let uid;
</script>

<svelte:head>
	<title>{username}</title>
</svelte:head>
<div class="contenido__principal">
	<PublicProfile {username} {uid} />
</div>

<style>
	.contenido__principal {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
