import React, { useState } from 'react';
import './ChessBoard.css';

const ChessBoard = () => {
  const initialBoard = [
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
  ];

  const [board, setBoard] = useState(initialBoard);
  const [draggedPiece, setDraggedPiece] = useState({
    piece: '',
    fromRow: -1,
    fromCol: -1
  });

  const handleDragStart = (e, row, col) => {
    if (board[row][col]) {
      setDraggedPiece({
        piece: board[row][col],
        fromRow: row,
        fromCol: col
      });
      e.dataTransfer.setData('text/plain', ''); // 필요한 브라우저 호환성을 위해
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // 드롭을 허용하기 위해 필요
  };

  const handleDrop = (e, toRow, toCol) => {
    e.preventDefault();

    // 같은 위치에 드롭하는 경우 무시
    if (draggedPiece.fromRow === toRow && draggedPiece.fromCol === toCol) {
      return;
    }

    // 새로운 보드 상태 생성
    const newBoard = board.map(row => [...row]);
    
    // 이전 위치의 말을 제거
    newBoard[draggedPiece.fromRow][draggedPiece.fromCol] = '';
    
    // 새 위치에 말을 놓음
    newBoard[toRow][toCol] = draggedPiece.piece;

    setBoard(newBoard);
  };

  return (
    <div className="chess-container">
      <div className="chess-board">
        {board.map((row, i) => (
          <div key={i} className="board-row">
            {row.map((piece, j) => (
              <div
                key={`${i}-${j}`}
                className={`square ${(i + j) % 2 === 0 ? 'white' : 'black'}`}
                draggable={!!piece}
                onDragStart={(e) => handleDragStart(e, i, j)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, i, j)}
              >
                {piece}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChessBoard;