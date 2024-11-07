// src/components/ChessBoard.js
import React from 'react';
import '../styles/ChessBoard.css';

const ChessBoard = ({ board, setBoard, socket }) => {
    const handleDragStart = (e, fromRow, fromCol) => {
        e.dataTransfer.setData('piece', JSON.stringify({ fromRow, fromCol }));
    };

    const handleDrop = (e, toRow, toCol) => {
        e.preventDefault();
        const { fromRow, fromCol } = JSON.parse(e.dataTransfer.getData('piece'));

        if (fromRow === toRow && fromCol === toCol) return;

        const newBoard = board.map(row => [...row]);
        newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
        newBoard[fromRow][fromCol] = '';

        setBoard(newBoard);
        socket.emit('move_piece', {
            room: 'chess_room',
            source: { row: fromRow, col: fromCol },
            target: { row: toRow, col: toCol }
        });
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