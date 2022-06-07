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

<PublicProfile {username} {uid} />
