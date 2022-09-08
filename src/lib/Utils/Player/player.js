import * as THREE from 'three';

export const createPlayer = async (height, width, depth) => {
	const HandsGeo = new THREE.BoxGeometry(width / 3, height / 3, depth / 3);
	const HandsMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	let leftHand = new THREE.Mesh(HandsGeo, HandsMaterial);
	let RightHand = new THREE.Mesh(HandsGeo, HandsMaterial);

	leftHand.position.x = height / 1.5;
	leftHand.position.z = -height / 2;
	RightHand.position.x = -leftHand.position.x;
	RightHand.position.z = leftHand.position.z;

	const BodyGeo = new THREE.BoxGeometry(width, height, depth);
	const skinSnap = await import('$lib/Utils/Player/basicSkin');
	let body = new THREE.Mesh(BodyGeo, skinSnap.materials);

	let player = new THREE.Group();
	player.add(body);
	player.add(leftHand);
	player.add(RightHand);
	
	player.position.y = height / 2;

	return player;
}