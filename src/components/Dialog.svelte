<script>
	import { isOverlayOpen } from '../stores/modal';
</script>

<div class="modal-wrapper">
	<div class="modal">
		<button
			class="modal-close"
			on:click={() => {
				isOverlayOpen.set(false);
			}}>&times;</button
		>
		<slot />
	</div>
</div>

<style>
	.modal-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		z-index: 40;
		opacity: 0.9;
		background-color: #ccc;
		color: #000;
	}
	.modal {
		position: relative;
		/**bg-white text-lg font-bold rounded-md px-8 py-10 relative max-w-lg*/
		background-color: #fff;
		border-radius: 10px;
		width: 80%;
		padding-left: 10px;
		padding-right: 8px;
		padding-top: 10px;
		padding-bottom: 10px;
	}
	.modal-close {
		position: absolute;
		top: 3;
		right: 0;
		padding: 20px;
		cursor: pointer;
		background-color: #fff;
		border: none;
		font-size: 25px;
	}
</style>
