<script>
	import * as THREE from 'three';
	import { onMount } from 'svelte';
	import { bindKeyboard, processKeyboard } from '$lib/Utils/Player/basicControls';
	import { drawPlayerAtCameraPosition } from '$lib/Utils/Player/drawPlayerAtCameraPosition';
	import { createPlayer } from '$lib/Utils/Player/player';
	import { createName } from '$lib/Utils/Player/playerName';

	export let scene = {};
	export let controls = {};
	export let scale = 10;
	export let socket = {};

	export let name = '';

	let [height, width, depth] = [scale, scale, scale];
	let clock = new THREE.Clock();
	let cameraOffset = 0.5;
	let keyboard = [];
	let player;

	const updateServerPlayers = () => {
		if (!controls.getObject()) return;

		socket.emit('updatePlayers', {
			x: player.position.x,
			z: player.position.z,
			y: player.position.y,
			rotation: controls.getObject().rotation,
			name: name
		});
	};

	onMount(async () => {
		player = await createPlayer(height, width, depth);
		player.name = await createName(name);

		scene.add(player);
		scene.add(player.name);

		if (controls.getObject()) controls.getObject().position.y = player.position.y + cameraOffset;

		bindKeyboard(keyboard);
		updateServerPlayers();

		const animate = () => {
			requestAnimationFrame(animate);
			let delta = clock.getDelta();

			if (controls.getObject()) processKeyboard(keyboard, controls, delta);
			drawPlayerAtCameraPosition(player, controls, cameraOffset);

			updateServerPlayers();
		};
		animate();
	});
</script>
