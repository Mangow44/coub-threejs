import * as THREE from 'three';

export const createPlayer = async (height, width, depth) => {
	const HandsGeo = new THREE.BoxGeometry(width / 4, height / 4, depth / 4);
	const HandsMaterial = new THREE.MeshBasicMaterial({ color: 0x8654F0 });

	let leftHand = new THREE.Mesh(HandsGeo, HandsMaterial);
	let RightHand = new THREE.Mesh(HandsGeo, HandsMaterial);

	leftHand.position.x = height / 1.6;
	leftHand.position.z = -height / 2;
	leftHand.position.y = -0.6;
	RightHand.position.x = -leftHand.position.x;
	RightHand.position.z = leftHand.position.z;
	RightHand.position.y = leftHand.position.y;

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