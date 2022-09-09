export const drawPlayerEntity = (player, playerPosition) => {
	player.position.x = playerPosition.x;
	player.position.z = playerPosition.z;
	player.position.y = playerPosition.y;
	player.setRotationFromEuler(playerPosition.rotation);

	player.name.position.x = player.position.x;
	player.name.position.z = player.position.z;

	let clone = player.clone();
	clone.quaternion._x = 0;
	clone.quaternion._z = 0;
	player.name.setRotationFromQuaternion(clone.quaternion);
	player.name.rotation.y += Math.PI;
}