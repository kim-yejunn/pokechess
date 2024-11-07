import React, { useEffect, useState } from 'react';
import ChessBoard from '../components/ChessBoard'; // Adjust path as needed
import socket from '../utils/socket.js'; // Adjust path as needed

// 체스 기물 이미지 URL 변수 정의
const bK = '/pic_img/bK.png';
const bT = '/pic_img/bT.png';
const wK = '/pic_img/wK.png';
const wT = '/pic_img/wT.png';

const initialChessboardState = [
    ['', bK, bT, bT, bK, ''],
    ['', '', bK, bK, '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', wK, wK, '', ''],
    ['', wK, wT, wT, wK, '']
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
