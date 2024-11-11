// src/socket.js
import io from 'socket.io-client';

// IP 주소
const socket = io.connect('http://172.31.52.240:5001', {
    transports: ['websocket']
});

socket.on('connect', () => {
    console.log('Connected to server!');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server!');
});

socket.on('connect_error', (err) => {
    console.error('Connection error:', err);
});

export default socket;
