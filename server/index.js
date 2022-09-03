import express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';

import {handler} from '../build/handler.js';

const port = 3000;
const app = express();
const server = createServer(app);
const io = new Server(server);

let players = [];

io.on('connection', (socket) => {
	console.log('connexion');

	socket.on('getPlayers', () => {
		io.emit('getPlayers', players);
	});

	socket.on('updatePlayers', (playerPosition) => {
		let exists = players.find(player => (player.id == socket.id));

		if (exists) {
			let index = players.indexOf(exists);
			players[index].position = playerPosition;
		} else {
			players.push({id: socket.id, position: playerPosition});
		}

		io.emit('getPlayers', players);
	});

	socket.on('disconnect', () => {
		console.log('disconnect');
		let exists = players.find(player => (player.id == socket.id));
		players.splice(players.indexOf(exists), 1);
		io.emit('getPlayers', players);
	});
});

app.use(handler);

server.listen(port);
