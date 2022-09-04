<script>
	import * as THREE from 'three';
	import { onMount } from 'svelte';
	import { io } from 'socket.io-client';
	import Player from '$lib/Player/index.svelte';
	import GameMenu from '$lib/GameMenu/index.svelte';
	import { pointerLock } from '$lib/Utils/Cameras/pointerLock';
	import { orbit } from '$lib/Utils/Cameras/orbit';
	import { grid } from '$lib/Utils/Helpers/grid';
	import { axes } from '$lib/Utils/Helpers/axes';
	import { each } from 'svelte/internal';
	import PlayerEntity from '$lib/Entities/PlayerEntity.svelte';

	const socket = io();

	let scene = {};
	let camera = {};
	let renderer = {};
	let controls = {};
	let locked = false;

	let entities = [];

	socket.on('getPlayers', (pls) => {
		entities = pls;
	});

	const loadThreeJs = async () => {
		onMount(() => {
			const onResize = () => {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(window.innerWidth, window.innerHeight);
			};

			const init = () => {
				scene = new THREE.Scene();

				//Helpers
				grid(scene);
				axes(scene);

				camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
				renderer = new THREE.WebGLRenderer();
				renderer.setSize(window.innerWidth, window.innerHeight);

				//Camera
				controls = pointerLock(camera, renderer);

				document.body.appendChild(renderer.domElement);

				window.addEventListener('resize', onResize, false);
			};

			init();

			function animate() {
				requestAnimationFrame(animate);
				locked = controls.isLocked;
				renderer.render(scene, camera);
			}
			animate();
		});
	};
</script>

{#await loadThreeJs() then _}
	<GameMenu {locked} onClick={() => controls.lock()} />

	<Player bind:scene bind:controls scale={3} {socket} />

	{#each entities as entity (entity.id)}
		{#if socket.id != entity.id}
			<PlayerEntity playerPosition={entity.position} bind:scene />
		{/if}
	{/each}
{/await}
