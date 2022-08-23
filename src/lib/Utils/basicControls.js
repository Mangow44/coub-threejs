export const basicControls = (object) => {
	object.velocity = { x: 0, y: 0, z: 0 };

	window.addEventListener('keydown', (e) => {
		if (e.key == 'ArrowUp') {
			object.velocity.y = 2;
		} else if (e.key == 'ArrowDown') {
			object.velocity.y = -2;
		} else if (e.key == 'ArrowRight') {
			object.velocity.x = 2;
		} else if (e.key == 'ArrowLeft') {
			object.velocity.x = -2;
		} else if (e.key == ' ') {
			if (object.position.z == 0 + object.height / 2) object.velocity.z += 10;
		}
	});

	window.addEventListener('keyup', (e) => {
		if (e.key == 'ArrowUp') {
			if (object.velocity.y == 2) object.velocity.y -= 2;
		} else if (e.key == 'ArrowDown') {
			if (object.velocity.y == -2) object.velocity.y += 2;
		} else if (e.key == 'ArrowRight') {
			if (object.velocity.x == 2) object.velocity.x -= 2;
		} else if (e.key == 'ArrowLeft') {
			if (object.velocity.x == -2) object.velocity.x += 2;
		}
	});
};
