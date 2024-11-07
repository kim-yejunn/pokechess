// src/socket.js
import io from 'socket.io-client';

// Connect to the Flask server (update the URL if needed)
const socket = io.connect('http://127.0.0.1:5000'); // or http://127.0.0.1:5000

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
