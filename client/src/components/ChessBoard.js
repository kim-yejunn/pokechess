// src/components/ChessBoard.js
import React from 'react';
import '../styles/ChessBoard.css';
import { isValidMove } from '../utils/chessRules';

const ChessBoard = ({ board, setBoard, socket }) => {
    const handleDragStart = (e, fromRow, fromCol) => {
        e.dataTransfer.setData('piece', JSON.stringify({ fromRow, fromCol }));
    };

    const handleDrop = (e, toRow, toCol) => {
        e.preventDefault();
        const { fromRow, fromCol } = JSON.parse(e.dataTransfer.getData('piece'));
    
        if (fromRow === toRow && fromCol === toCol) return;
    
        const piece = board[fromRow][fromCol];
    
        // 체스 규칙에 따라 이동이 유효한지 확인
        if (isValidMove(piece, { row: fromRow, col: fromCol }, { row: toRow, col: toCol }, board)) {
            const newBoard = board.map(row => [...row]);
            newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
            newBoard[fromRow][fromCol] = '';
    
            setBoard(newBoard);
            socket.emit('move_piece', {
                room: 'chess_room',
                source: { row: fromRow, col: fromCol },
                target: { row: toRow, col: toCol }
            });
        } else {
            // 이동이 유효하지 않을 경우 피드백 제공 (예: 콘솔에 메시지 출력)
            console.log("Invalid move!");
        }
    };    

    return (
        <div className="chess-board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="board-row">
                    {row.map((piece, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className={`square ${(rowIndex + colIndex) % 2 === 0 ? 'white' : 'black'}`}
                            draggable={!!piece}
                            onDragStart={(e) => handleDragStart(e, rowIndex, colIndex)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleDrop(e, rowIndex, colIndex)}
                        >
                            {piece ? (
                                <img
                                    src={piece}
                                    alt="chess piece"
                                    className="chess-piece"
                                />
                            ) : null}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ChessBoard;