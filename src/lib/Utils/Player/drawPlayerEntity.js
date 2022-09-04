export const drawPlayerEntity = (player, playerPosition) => {
	player.position.x = playerPosition.x;
	player.position.z = playerPosition.z;
	player.position.y = playerPosition.y;
	player.setRotationFromEuler(playerPosition.rotation);
}