import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

export const pointerLock = (camera, renderer) => {
	let controls = new PointerLockControls(camera, renderer.domElement);
	
	return controls;
};
