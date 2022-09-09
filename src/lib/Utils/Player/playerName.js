import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

export const createName = async (name) => {
	let nameMesh;
	let font = await loadFont();

	const geometry = new TextGeometry(name, { font: font, size: 1, height: 0.5 });
	geometry.center();
	const material = new THREE.MeshBasicMaterial({ color: 0x8654f0 });

	nameMesh = new THREE.Mesh(geometry, material);

	nameMesh.position.y = 5;
	nameMesh.rotation.y = Math.PI;

	return nameMesh;
}

const loadFont = async () => {
	let loader = new FontLoader();
	return await loader.loadAsync(
		'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json'
	);
}