<script>
	export let locked = false;
	export let onClick = () => {};
</script>

<!-- TODO personnaliser le message: play, resume... -->
{#if !locked}
	<div class="fixed flex h-screen w-full">
		<span class="absolute h-full w-full bg-slate-600 opacity-60" />
		<button class="m-auto bg-white w-48 h-24 z-10" on:click={() => onClick()}> Play </button>
	</div>
{/if}
