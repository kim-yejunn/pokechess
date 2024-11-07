import React, { useEffect, useState } from 'react';
import ChessBoard from '../components/ChessBoard'; // Adjust path as needed
import socket from '../utils/socket.js'; // Adjust path as needed
import { isValidMove } from '../utils/chessRules'; // 게임 룰 import

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

    const handleDrop = (fromRow, fromCol, toRow, toCol) => {
        const piece = board[fromRow][fromCol];
        const from = { row: fromRow, col: fromCol };
        const to = { row: toRow, col: toCol };

        // 이동 유효성 확인
        if (isValidMove(piece, from, to, board)) {
            const newBoard = board.map(row => [...row]);
            newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
            newBoard[fromRow][fromCol] = '';
            setBoard(newBoard);
        }
    };

    return (
        <div>
            <h2>Chess Game</h2>
            <ChessBoard board={board} setBoard={setBoard} handleDrop={handleDrop} />
        </div>
    );
};

export default GamePage;
