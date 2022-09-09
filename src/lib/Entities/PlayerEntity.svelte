<script>
	import { onDestroy, onMount } from 'svelte';
	import { drawPlayerEntity } from '$lib/Utils/Player/drawPlayerEntity';
	import { createPlayer } from '$lib/Utils/Player/player';
	import { createName } from '$lib/Utils/Player/playerName';

	export let scene = {};
	export let playerData = {};
	export let scale = 10;

	let [height, width, depth] = [scale, scale, scale];
	let player;

	onMount(async () => {
		player = await createPlayer(height, width, depth);
		player.name = await createName(playerData.name);

		scene.add(player);
		scene.add(player.name);

		drawPlayerEntity(player, playerData);

		const animate = () => {
			if (!player) return;
			requestAnimationFrame(animate);
			drawPlayerEntity(player, playerData);
		};
		animate();
	});

	onDestroy(() => {
		scene.remove(player.name);
		scene.remove(player);
		player = null;
	});
</script>
