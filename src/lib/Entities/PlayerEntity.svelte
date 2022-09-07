<script>
	import * as THREE from 'three';
	import { onDestroy, onMount } from 'svelte';
	import { drawPlayerEntity } from '$lib/Utils/Player/drawPlayerEntity';

	export let scene = {};
	export let playerPosition = {};
	export let scale = 10;

	let [height, width, depth] = [scale, scale, scale];
	let player;

	onMount(async () => {
		const geometry = new THREE.BoxGeometry(height, width, depth);
		const snap = await import('$lib/Utils/Player/basicSkin');
		player = new THREE.Mesh(geometry, snap.materials);

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
