<script>
	import { onMount } from 'svelte';
	import Plane from '$lib/Plane/index.svelte';
	import Object from '$lib/Object/index.svelte';

	import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

	let scene = {};
	let camera = {};
	let renderer = {};

	const loadThreeJs = async () => {
		onMount(() => {
			const buildScene = () => {
				const scene = new THREE.Scene();
				const camera = new THREE.PerspectiveCamera(
					75,
					window.innerWidth / window.innerHeight,
					0.1,
					1000
				);

				const renderer = new THREE.WebGLRenderer();
				renderer.setSize(window.innerWidth, window.innerHeight);
				document.body.appendChild(renderer.domElement);

				return { scene, camera, renderer };
			};

			let res = buildScene();
			scene = res.scene;
			camera = res.camera;
			renderer = res.renderer;

			//const controls = new OrbitControls(camera, renderer.domElement);
			//camera.position.set(0, -100, 20);
			//controls.update();

			camera.position.set(0, -50, 40);
			camera.rotation.x = 1.3;

			function animate() {
				requestAnimationFrame(animate);
				//controls.update();
				renderer.render(scene, camera);
			}
			animate();
		});
	};
</script>

{#await loadThreeJs() then _}
	<Plane bind:scene bind:camera bind:renderer width={100} height={100} />
	<Object bind:scene bind:camera bind:renderer />
{/await}
