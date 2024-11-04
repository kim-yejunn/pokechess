import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000'); // Replace with your backend URL

function ChessGame({ roomId }) {
    const [board, setBoard] = useState(initialBoardState);

    useEffect(() => {
        // Join the game room
        socket.emit('join_game', { room: roomId });

        // Listen for board updates
        socket.on('update_board', (moveData) => {
            setBoard(prevBoard => updateBoard(prevBoard, moveData));
        });

        return () => {
            socket.off('update_board');
        };
    }, [roomId]);

    const makeMove = (move) => {
        socket.emit('move_piece', { room: roomId, move });
    };

    return (
        <div>
            {/* Chessboard Component */}
            <ChessBoard board={board} onMove={makeMove} />
        </div>
    );
}