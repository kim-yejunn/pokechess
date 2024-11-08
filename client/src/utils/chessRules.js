// src/utils/chessRules.js

// 이동이 유효한지 확인하는 함수
export const isValidKingMove = (from, to, board) => {
    const rowDiff = Math.abs(to.row - from.row);
    const colDiff = Math.abs(to.col - from.col);

    console.log("From:", from, "To:", to, "Row Diff:", rowDiff, "Col Diff:", colDiff); // 디버깅용 로그

    // King은 가로, 세로, 대각선으로 한 칸 이동 가능
    if ((rowDiff === 1 && colDiff === 0) ||   // 상하 이동
        (rowDiff === 0 && colDiff === 1) ||   // 좌우 이동
        (rowDiff === 1 && colDiff === 1)) {   // 대각선 이동
        const targetPiece = board[to.row][to.col];
        console.log("Target Piece:", targetPiece); // 목표 칸에 있는 말 확인

        // 목표 칸이 빈 칸이거나 상대방 기물인 경우 이동 가능
        return targetPiece === '' || targetPiece[0] !== board[from.row][from.col][0];
    }

    return false;
};

export const isValidMove = (piece, from, to, board) => {
    // piece가 이미지 경로일 경우 파일 이름에서 말의 타입 추출
    const pieceType = piece.includes('/') ? piece.match(/\/([bw][A-Z])\.png$/)?.[1] : piece;
    console.log("Checking move for piece type:", pieceType); // 이동하려는 말 타입 확인

    switch (pieceType) {
        case 'bK': // 검은색 King
        case 'wK': // 흰색 King
            return isValidKingMove(from, to, board);
        // 다른 기물 규칙을 추가하려면 여기에 추가
        default:
            console.log("Invalid piece or undefined rule for piece:", pieceType);
            return false;
    }
};

