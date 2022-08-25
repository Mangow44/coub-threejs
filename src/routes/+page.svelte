<script>
	import { onMount } from 'svelte';
	import Player from '$lib/Player/index.svelte';
	import GameMenu from '$lib/GameMenu/index.svelte';
	import * as THREE from 'three';
	import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

	let scene = {};
	let camera = {};
	let renderer = {};
	let controls = {};
	let locked = false;

	const loadThreeJs = async () => {
		onMount(() => {
			const onResize = () => {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(window.innerWidth, window.innerHeight);
			};

			const init = () => {
				scene = new THREE.Scene();
				scene.background = new THREE.Color(0xffffff);
				let grid = new THREE.GridHelper(100, 20, 0x0a0a0a, 0x0a0a0a);
				grid.position.set(0, -0.5, 0);
				scene.add(grid);
				const axesHelper = new THREE.AxesHelper(3);
				scene.add(axesHelper);
				camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
				renderer = new THREE.WebGLRenderer();
				renderer.setSize(window.innerWidth, window.innerHeight);

				controls = new PointerLockControls(camera, renderer.domElement);
				//controls = new OrbitControls(camera, renderer.domElement);

				document.body.appendChild(renderer.domElement);

				window.addEventListener('resize', onResize, false);
			};

			init();
			//camera.position.set(0, 0, 20);
			//controls.update();

			function animate() {
				requestAnimationFrame(animate);
				//controls.update();
				locked = controls.isLocked;
				renderer.render(scene, camera);
			}
			animate();
		});
	};
</script>

{#await loadThreeJs() then _}
	<GameMenu {locked} onClick={() => controls.lock()} />

	<Player bind:scene bind:controls scale={3} />
{/await}
