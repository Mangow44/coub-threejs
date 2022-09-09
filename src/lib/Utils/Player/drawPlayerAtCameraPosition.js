import * as THREE from 'three';

export const drawPlayerAtCameraPosition = (player, controls, cameraOffset) => {
	if (!controls.getObject()) return;
	player.position.x = controls.getObject().position.x;
	player.position.z = controls.getObject().position.z;
	player.position.y = controls.getObject().position.y - cameraOffset;
	player.setRotationFromEuler(controls.getObject().rotation);

	player.name.position.x = player.position.x;
	player.name.position.z = player.position.z;
	
	let clone = player.clone();
	clone.quaternion._x = 0;
	clone.quaternion._z = 0;
	player.name.setRotationFromQuaternion(clone.quaternion);
	player.name.rotation.y += Math.PI;
};
