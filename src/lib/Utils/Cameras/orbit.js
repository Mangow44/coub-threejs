import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const orbit = (camera, renderer) => {
	let controls = new OrbitControls(camera, renderer.domElement);

	camera.position.set(0, 0, 20);

	// permet de ne pas déclencher les évenements liés à la pointerLockCamera
	controls.isLocked = true;
	controls.getObject = () => {
		return null;
	}

	controls.update();


	function animate() {
		requestAnimationFrame(animate);
		controls.update();
	}
	animate();

	return controls;
};
