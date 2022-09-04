<script>
	import * as THREE from 'three';
	import { onDestroy, onMount } from 'svelte';
	import { drawPlayerEntity } from '$lib/Utils/Player/drawPlayerEntity';
	import { materials } from '$lib/Utils/Player/basicSkin';

	export let playerPosition = {};
	export let scene = {};
	let player;

	// rotation / taille / couleur
	onMount(() => {
		const geometry = new THREE.BoxGeometry(10, 10, 10);
		player = new THREE.Mesh(geometry, materials);

		scene.add(player);
		drawPlayerEntity(player, playerPosition);

		const animate = () => {
			if (player) {
				requestAnimationFrame(animate);
				drawPlayerEntity(player, playerPosition);
			}
		};
		animate();
	});

	onDestroy(() => {
		scene.remove(player);
		player = null;
	});
</script>
