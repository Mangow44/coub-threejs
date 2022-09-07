export const drawPlayerAtCameraPosition = (player, controls) => {
	if (!controls.getObject()) return;
	player.position.x = controls.getObject().position.x;
	player.position.z = controls.getObject().position.z;
	player.position.y = controls.getObject().position.y;
	player.setRotationFromEuler(controls.getObject().rotation);
};
