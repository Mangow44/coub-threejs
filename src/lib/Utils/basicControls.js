export const bindKeyboard = (keyboard) => {
	window.addEventListener('keydown', (e) => {
		keyboard[e.key] = true;
	});

	window.addEventListener('keyup', (e) => {
		keyboard[e.key] = false;
	});
};

export const processKeyboard = (keyboard, controls, delta = 0) => {
	let speed = 5;
	let currentSpeed = speed * delta;
	if (keyboard['w'] || keyboard['z']) {
		controls.moveForward(currentSpeed);
	}
	if (keyboard['s']) {
		controls.moveForward(-currentSpeed);
	}
	if (keyboard['a'] || keyboard['q']) {
		controls.moveRight(-currentSpeed);
	}
	if (keyboard['d']) {
		controls.moveRight(currentSpeed);
	}
};
