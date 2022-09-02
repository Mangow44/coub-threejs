<script>
	import * as THREE from 'three';
	import { onMount } from 'svelte';
	import { bindKeyboard, processKeyboard } from '$lib/Utils/Player/basicControls';
	import { drawPlayer } from '$lib/Utils/Player/drawPlayer';

	export let scene = {};
	export let controls = {};
	export let scale = 10;

	let [height, width, depth] = [scale, scale, scale];
	let clock = new THREE.Clock();
	let keyboard = [];
	let player;

	onMount(() => {
		const geometry = new THREE.BoxGeometry(width, height, depth);
		const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		player = new THREE.Mesh(geometry, material);
		player.position.y = 0 + height / 2;
		scene.add(player);

		if (controls.getObject) controls.getObject().position.y = player.position.y;

		bindKeyboard(keyboard);

		const animate = () => {
			requestAnimationFrame(animate);
			let delta = clock.getDelta();
			processKeyboard(keyboard, controls, delta);
			drawPlayer(player, controls);
		};
		animate();
	});
</script>
