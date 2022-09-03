<script>
	import * as THREE from 'three';
	import { onMount } from 'svelte';
	import { bindKeyboard, processKeyboard } from '$lib/Utils/Player/basicControls';
	import { drawPlayer } from '$lib/Utils/Player/drawPlayer';

	export let scene = {};
	export let controls = {};
	export let scale = 10;
	export let socket = {};

	let [height, width, depth] = [scale, scale, scale];
	let clock = new THREE.Clock();
	let keyboard = [];
	let player;

	onMount(() => {
		const geometry = new THREE.BoxGeometry(width, height, depth);
		const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		player = new THREE.Mesh(geometry, material);
		scene.add(player);

		socket.emit('updatePlayers', {
			x: player.position.x,
			z: player.position.z,
			y: player.position.y,
			rotation: controls.getObject().rotation
		});

		if (controls.getObject()) controls.getObject().position.y = height;

		bindKeyboard(keyboard);

		const animate = () => {
			requestAnimationFrame(animate);
			let delta = clock.getDelta();
			processKeyboard(keyboard, controls, delta);
			drawPlayer(player, controls);

			socket.emit('updatePlayers', {
				x: player.position.x,
				z: player.position.z,
				y: player.position.y,
				rotation: controls.getObject().rotation
			});
		};
		animate();
	});
</script>
