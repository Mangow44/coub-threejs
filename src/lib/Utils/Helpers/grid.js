import * as THREE from 'three';

export const grid = (scene) => {
	let grid = new THREE.GridHelper(100, 20, 0x0a0a0a, 0x0a0a0a);
	grid.position.set(0, -1, 0);
	scene.add(grid);

	scene.background = new THREE.Color(0xffffff);
}