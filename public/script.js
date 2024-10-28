$(function() {
    let color; // 현재 플레이어의 색상
    const chess = new Chess();
    const board = ChessBoard('board', {
        draggable: true,
        position: 'start',
        onDrop: handleMove,
    });

    const socket = io();

    $('#white').click(() => {
        color = 'w';
        startGame();
    });

    $('#black').click(() => {
        color = 'b';
        startGame();
    });

    function startGame() {
        $('#color-selection').hide(); // 색상 선택 UI 숨기기
        $('#board').show(); // 체스판 보여주기

        socket.on('move', (move) => {
            chess.move(move);
            board.position(chess.fen());
            updateStatus();
        });
    }

    function handleMove(source, target) {
        const piece = chess.get(source);
        
        // 현재 턴에 맞지 않으면 이동 취소
        if ((color === 'w' && chess.turn() === 'b') || 
            (color === 'b' && chess.turn() === 'w')) {
            return 'snapback'; // 잘못된 턴
        }

        // 턴에 맞는 기물만 이동할 수 있도록
        if ((color === 'w' && piece.color === 'b') || 
            (color === 'b' && piece.color === 'w')) {
            return 'snapback'; // 잘못된 기물
        }

        const move = chess.move({
            from: source,
            to: target,
            promotion: 'q' // 항상 퀸으로 승진
        });

        if (move === null) return 'snapback';  // 유효하지 않은 이동

        socket.emit('move', move);
        board.position(chess.fen());
        updateStatus();
    }

    function updateStatus() {
        const status = `현재 차례: ${chess.turn() === 'w' ? '흰색' : '검은색'}`;
        document.getElementById('status').innerText = status;
    }
});
