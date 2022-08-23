export const basicControls = (object) => {
	object.velocity = { x: 0, y: 0 };

	window.addEventListener('keydown', (e) => {
		if (e.key == 'ArrowUp') {
			object.velocity.y = 2;
		} else if (e.key == 'ArrowDown') {
			object.velocity.y = -2;
		} else if (e.key == 'ArrowRight') {
			object.velocity.x = 2;
		} else if (e.key == 'ArrowLeft') {
			object.velocity.x = -2;
		}
	});

	window.addEventListener('keyup', (e) => {
		if (e.key == 'ArrowUp') {
			object.velocity.y = 0;
		} else if (e.key == 'ArrowDown') {
			object.velocity.y = 0;
		} else if (e.key == 'ArrowRight') {
			object.velocity.x = 0;
		} else if (e.key == 'ArrowLeft') {
			object.velocity.x = 0;
		}
	});
};
