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
        
        const pieceData = e.dataTransfer.getData('piece');
        if (!pieceData) return; // 데이터가 없는 경우 드롭 취소
    
        const { fromRow, fromCol } = JSON.parse(pieceData);
        if (fromRow === toRow && fromCol === toCol) return; // 같은 위치로 이동 시 리턴
    
        const piece = board[fromRow][fromCol];
    
        // 이동이 유효한지 확인
        if (isValidMove(piece, { row: fromRow, col: fromCol }, { row: toRow, col: toCol }, board)) {
            // 새로운 보드를 복사해서 업데이트
            const newBoard = board.map(row => [...row]);
            newBoard[toRow][toCol] = newBoard[fromRow][fromCol]; // 이동할 위치에 기물 배치
            newBoard[fromRow][fromCol] = ''; // 원래 위치를 빈 문자열로 설정
    
            setBoard(newBoard); // 상태 업데이트
            socket.emit('move_piece', {
                room: 'chess_room',
                source: { row: fromRow, col: fromCol },
                target: { row: toRow, col: toCol }
            });
        } else {
            // 이동이 유효하지 않을 경우 원래 위치로 돌아가기
            console.log("Invalid move! Piece will remain in the original position.");
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