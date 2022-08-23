<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { basicControls } from '$lib/Utils/basicControls'

	export let scene = {};
	export let camera = {};
	export let renderer = {};
	export let scale = 10;

	let [height, width, depth] = [scale, scale, scale];

	onMount(() => {
		const geometry = new THREE.BoxGeometry(width, height, depth);
		const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		const cube = new THREE.Mesh(geometry, material);
		cube.position.z = 0 + height/2;
		scene.add(cube);

		basicControls(cube);

		const animate = () => {
			requestAnimationFrame(animate);
			cube.position.x += cube.velocity.x;
			cube.position.y += cube.velocity.y;
		}
		animate();
	});
</script>
