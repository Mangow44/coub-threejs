<script>
	import * as THREE from 'three';
	import { onMount } from 'svelte';
	import { bindKeyboard, processKeyboard } from '$lib/Utils/Player/basicControls';
	import { drawPlayerAtCameraPosition } from '$lib/Utils/Player/drawPlayerAtCameraPosition';

	export let scene = {};
	export let controls = {};
	export let scale = 10;
	export let socket = {};

	let [height, width, depth] = [scale, scale, scale];
	let clock = new THREE.Clock();
	let keyboard = [];
	let player;

	const updateServerPlayers = () => {
		socket.emit('updatePlayers', {
			x: player.position.x,
			z: player.position.z,
			y: player.position.y,
			rotation: controls.getObject().rotation
		});
	};

	onMount(() => {
		const geometry = new THREE.BoxGeometry(width, height, depth);
		const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		player = new THREE.Mesh(geometry, material);
		scene.add(player);

		if (controls.getObject()) controls.getObject().position.y = height;

		bindKeyboard(keyboard);
		updateServerPlayers();

		const animate = () => {
			requestAnimationFrame(animate);
			let delta = clock.getDelta();
			processKeyboard(keyboard, controls, delta);
			drawPlayerAtCameraPosition(player, controls);
			updateServerPlayers();
		};
		animate();
	});
</script>
