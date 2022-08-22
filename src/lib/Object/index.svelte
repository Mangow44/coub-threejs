<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	export let scene = {};
	export let camera = {};
	export let renderer = {};

	onMount(() => {
		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		const cube = new THREE.Mesh(geometry, material);
		scene.add(cube);

		camera.position.z = 5;

		function animate() {
			requestAnimationFrame(animate);
			cube.rotation.x += 0.01;
			cube.rotation.y += 0.01;
		}
		animate();
	});
</script>
