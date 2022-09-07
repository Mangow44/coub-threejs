export const bindKeyboard = (keyboard) => {

	// To UPPER case, car lors du sprint, on appuie sur SHIFT et il y a un conflit si les touches sont pas normalisées

	window.addEventListener('keydown', (e) => {
		let key = e.key.toUpperCase();
		keyboard[key] = true;
	});

	window.addEventListener('keyup', (e) => {
		let key = e.key.toUpperCase();
		keyboard[key] = false;
	});
};

export const processKeyboard = (keyboard, controls, delta = 0) => {
	if (!controls.getObject) return;

	let speed = 5;
	let currentSpeed = speed * delta;

	if (keyboard['SHIFT']) currentSpeed = currentSpeed * 2.5;

	if (keyboard['W'] || keyboard['Z']) {
		controls.moveForward(currentSpeed);
	}
	if (keyboard['S']) {
		controls.moveForward(-currentSpeed);
	}
	if (keyboard['A'] || keyboard['Q']) {
		controls.moveRight(-currentSpeed);
	}
	if (keyboard['D']) {
		controls.moveRight(currentSpeed);
	}
};

