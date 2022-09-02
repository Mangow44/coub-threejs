import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const orbit = (camera, renderer) => {
	let controls = new OrbitControls(camera, renderer.domElement);

	camera.position.set(0, 0, 20);
	controls.isLocked = true;
	controls.update();

	function animate() {
		requestAnimationFrame(animate);
		controls.update();
	}
	animate();

	return controls;
};
