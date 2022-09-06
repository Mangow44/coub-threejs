export const bindKeyboard = (keyboard) => {

	// To lower case, car lors du sprint, on appuie sur SHIFT qui met les touches en MAJ

	window.addEventListener('keydown', (e) => {
		let key = e.key.toLowerCase();
		keyboard[key] = true;
	});

	window.addEventListener('keyup', (e) => {
		let key = e.key.toLowerCase();
		keyboard[key] = false;
	});
};

export const processKeyboard = (keyboard, controls, delta = 0) => {
	if (!controls.getObject) return;

	let speed = 8;
	let currentSpeed = speed * delta;

	if (keyboard['shift'] == true) currentSpeed = currentSpeed * 2.5;

	if (keyboard['w'] || keyboard['z'] == true) {
		controls.moveForward(currentSpeed);
	}
	if (keyboard['s'] == true) {
		controls.moveForward(-currentSpeed);
	}
	if (keyboard['a'] || keyboard['q'] == true) {
		controls.moveRight(-currentSpeed);
	}
	if (keyboard['d'] == true) {
		controls.moveRight(currentSpeed);
	}
};

