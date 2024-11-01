const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('새로운 클라이언트가 연결되었습니다.');

    socket.on('move', (move) => {
        socket.broadcast.emit('move', move);
    });

    socket.on('disconnect', () => {
        console.log('클라이언트가 연결 해제되었습니다.');
    });
});

server.listen(3000, () => {
    console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});
