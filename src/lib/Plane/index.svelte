<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	export let scene = {};
	export let camera = {};
	export let renderer = {};
	export let width = 1;
	export let height = 1;

	onMount(() => {
		const geometry = new THREE.PlaneGeometry(width, height);
		const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
		const plane = new THREE.Mesh(geometry, material);
		plane.rotation.x = -Math.PI / 2;
		scene.add(plane);
	});
</script>
