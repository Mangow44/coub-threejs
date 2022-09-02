import * as THREE from 'three';


export const axes = (scene) => {
	let axesHelper = new THREE.AxesHelper(10);
	scene.add(axesHelper);
}