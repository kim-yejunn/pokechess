// src/utils/chessRules.js

// 이동이 유효한지 확인하는 함수
export const isValidKingMove = (from, to, board) => {
    // 보드 범위를 벗어나는지 확인
    if (
        from.row < 0 || from.row >= board.length || from.col < 0 || from.col >= board[0].length ||
        to.row < 0 || to.row >= board.length || to.col < 0 || to.col >= board[0].length
    ) {
        return false; // 보드 범위를 벗어났을 때 이동 불가능 처리
    }

    const rowDiff = Math.abs(to.row - from.row);
    const colDiff = Math.abs(to.col - from.col);

    // King은 가로, 세로, 대각선으로 한 칸 이동 가능
    if ((rowDiff === 1 && colDiff === 0) ||   // 상하 이동
        (rowDiff === 0 && colDiff === 1) ||   // 좌우 이동
        (rowDiff === 1 && colDiff === 1)) {   // 대각선 이동

        const targetPiece = board[to.row][to.col] || ''; // undefined일 경우 빈 문자열로 대체
        const sourcePiece = board[from.row][from.col] || ''; // undefined일 경우 빈 문자열로 대체

        // 목표 칸이 빈 칸이거나 상대방 기물이 있는 경우 이동 가능
        if (targetPiece === '' || targetPiece[0] !== sourcePiece[0]) {
            return true;
        }
    }

    return false;
};

export const isValidMove = (piece, from, to, board) => {
    const pieceType = piece.match(/\/([bw][A-Z])\.png$/)?.[1] || piece;
    
    switch (pieceType) {
        case 'bK': // 검은색 King
        case 'wK': // 흰색 King
            return isValidKingMove(from, to, board);
        default:
            return false;
    }
};

