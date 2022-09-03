<script>
	import * as THREE from 'three';
	import { onDestroy } from 'svelte';

	export let playerPosition = {};
	export let scene = {};

	// rotation / taille / couleur
	const geometry = new THREE.BoxGeometry(10, 10, 10);
	const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	let player = new THREE.Mesh(geometry, material);

	player.position.x = playerPosition.x;
	player.position.z = playerPosition.z;
	player.position.y = playerPosition.y;
	player.setRotationFromEuler(playerPosition.rotation);

	scene.add(player);

	onDestroy(() => {
		scene.remove(player);
	});

	const animate = () => {
		requestAnimationFrame(animate);
		player.position.x = playerPosition.x;
		player.position.z = playerPosition.z;
		player.position.y = playerPosition.y;
		player.setRotationFromEuler(playerPosition.rotation);
	};
	animate();
</script>
