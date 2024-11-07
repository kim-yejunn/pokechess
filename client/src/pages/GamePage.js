import React, { useEffect, useState } from 'react';
import ChessBoard from '../components/ChessBoard'; // Adjust path as needed
import socket from '../utils/socket.js'; // Adjust path as needed

// 체스 기물 이미지 URL 변수 정의
const bK = 'path/to/black_knight.png';
const bT = 'path/to/black_bishop.png';
const wK = 'path/to/black_queen.png';
const wT = 'path/to/black_king.png';

const initialChessboardState = [
    ['', 'bt', 'bk', 'bk', 'bt', ''],
    ['', '', 'bk', 'bk', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', 'wk', 'wk', '', ''],
    ['', 'wk', 'wt', 'wt', 'wk', '']
];

const GamePage = () => {
    const [board, setBoard] = useState(initialChessboardState);

    useEffect(() => {
        socket.on('update_board', (updatedBoard) => {
            setBoard(updatedBoard);
        });

        return () => {
            socket.off('update_board');
        };
    }, []);

    return (
        <div>
            <h2>Chess Game</h2>
            <ChessBoard board={board} setBoard={setBoard} />
        </div>
    );
};

export default GamePage;
