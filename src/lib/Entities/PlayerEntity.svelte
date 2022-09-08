<script>
	import { onDestroy, onMount } from 'svelte';
	import { drawPlayerEntity } from '$lib/Utils/Player/drawPlayerEntity';
	import { createPlayer } from '$lib/Utils/Player/player';

	export let scene = {};
	export let playerPosition = {};
	export let scale = 10;

	let [height, width, depth] = [scale, scale, scale];
	let player;
	let hands;

	onMount(async () => {
		let playerSnap = await createPlayer(height, width, depth);
		player = playerSnap.player;
		hands = playerSnap.hands;

		scene.add(player);
		drawPlayerEntity(player, playerPosition);

		const animate = () => {
			if (!player) return;
			requestAnimationFrame(animate);
			drawPlayerEntity(player, playerPosition);
		};
		animate();
	});

	onDestroy(() => {
		scene.remove(player);
		player = null;
	});
</script>
