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
            const newBoard = convertTo2DArray(updatedBoard);
            setBoard(newBoard);
        });

        socket.emit('join_game', { room: 'chess_room' });

        return () => {
            socket.off('update_board');
        };
    }, []);

    const convertTo2DArray = (boardState) => {
        const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
        const newBoard = [];
        for (let i = 1; i <= 6; i++) {
            const row = [];
            for (let j = 0; j < 6; j++) {
                row.push(boardState[`${rows[j]}${i}`]);
            }
            newBoard.push(row);
        }
        return newBoard;
    };

    return (
        <div>
            <ChessBoard board={board} setBoard={setBoard} socket={socket} />
        </div>
    );
};

export default GamePage;