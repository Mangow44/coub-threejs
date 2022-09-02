<script>
	export let locked = false;
	export let onClick = () => {};
	let message = 'Play';

	$: if (locked) message = 'Resume';
</script>

<!-- TODO corriger le bug du bouton, il faut attendre le locker... -->
{#if !locked}
	<div class="fixed flex h-screen w-full">
		<span class="absolute h-full w-full bg-slate-600 opacity-60" />
		<button class="m-auto bg-white w-48 h-24 z-10" on:click={() => onClick()}> {message} </button>
	</div>
{/if}
