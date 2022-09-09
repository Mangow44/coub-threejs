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
	import PlayerEntity from '$lib/Entities/PlayerEntity.svelte';

	// POOP
	let name = '';
	let isOk = false;

	const socket = io();

	let scene = {};
	let camera = {};
	let renderer = {};
	let controls = {};
	let locked = false;

	let entities = [];

	socket.on('getPlayers', (players) => {
		entities = players;
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
	<!-- POOP -->
	{#if !isOk}
		<div class="absolute bg-gray-700 text-white">
			<label for="name">Nom du joueur</label>
			<input
				type="text"
				name="playerName"
				id="name"
				class="border-2 border-black text-black"
				bind:value={name}
			/>
			<button
				on:click={() => {
					isOk = true;
				}}>OK</button
			>
		</div>
	{:else}
		<GameMenu {locked} onClick={() => controls.lock()} />

		<Player bind:scene bind:controls scale={3} {socket} {name} />

		{#each entities as entity (entity.id)}
			{#if socket.id != entity.id}
				<PlayerEntity bind:scene playerData={entity.data} scale={3} />
			{/if}
		{/each}
	{/if}
{/await}
