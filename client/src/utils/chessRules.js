// src/utils/chessRules.js

// 이동이 유효한지 확인하는 함수
export const isValidKingMove = (from, to, board) => {
    const rowDiff = Math.abs(to.row - from.row);
    const colDiff = Math.abs(to.col - from.col);

    // King은 가로, 세로, 대각선 방향으로 한 칸만 이동 가능
    if ((rowDiff === 1 && colDiff === 0) ||   // 상하 이동
        (rowDiff === 0 && colDiff === 1) ||   // 좌우 이동
        (rowDiff === 1 && colDiff === 1)) {   // 대각선 이동
        const targetPiece = board[to.row][to.col];
        // 목표 칸이 빈 칸이거나 상대방 기물인 경우 이동 가능
        return targetPiece === '' || targetPiece[0] !== board[from.row][from.col][0];
    }

    return false;
};

// 말의 이동 유효성을 확인하는 함수
export const isValidMove = (piece, from, to, board) => {
    switch (piece) {
        case 'bK': // 검은색 King
        case 'wK': // 흰색 King
            return isValidKingMove(from, to, board);
        // 다른 기물 규칙은 필요에 따라 추가
        default:
            return false;
    }
};
