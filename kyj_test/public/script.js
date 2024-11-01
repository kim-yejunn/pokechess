$(function() {
    let color;
    let turn = 'w';
    const socket = io();

    // 초기 체스판 설정: 흰색 왕(wT)은 아래쪽 두 칸, 검은색 왕(bT)은 위쪽 두 칸을 차지
    const board = [
        ['.', 'bD', 'bT', 'bT', 'bC', '.'],
        ['.', '.', 'bA', 'bB', '.', '.'],
        ['.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.'],
        ['.', '.', 'wB', 'wC', '.', '.'],
        ['.', 'wA', 'wT', 'wT', 'wD', '.']
    ];

    function drawBoard() {
        $('#board').empty();
        board.forEach((row, rowIndex) => {
            row.forEach((square, colIndex) => {
                const squareDiv = $('<div>')
                    .addClass('square')
                    .addClass((rowIndex + colIndex) % 2 === 0 ? 'white' : 'black')
                    .attr('data-row', rowIndex)
                    .attr('data-col', colIndex);

                if (square !== '.') {
                    const pieceImg = $('<img>').attr('src', `/img/chesspieces/wikipedia/${square}.png`).css({
                        width: '100%',
                        height: '100%'
                    });
                    squareDiv.append(pieceImg);
                }

                $('#board').append(squareDiv);
            });
        });
    }

    function updateStatus() {
        $('#status').text(`현재 차례: ${turn === 'w' ? '백' : '흑'}`);
    }

    function movePiece(fromRow, fromCol, toRow, toCol) {
        const movingPiece = board[fromRow][fromCol];

        // 왕(wT, bT)은 이동할 수 없도록 설정
        if (movingPiece === 'wT' || movingPiece === 'bT') {
            return;
        }

        // 이동 가능 조건: 한 칸 내 이동, 목표 위치가 빈칸이어야 함
        const isAdjacentMove = Math.abs(fromRow - toRow) <= 1 && Math.abs(fromCol - toCol) <= 1;
        const isTargetEmpty = board[toRow][toCol] === '.';

        // 이동 조건이 맞을 때만 이동 수행
        if (isAdjacentMove && isTargetEmpty) {
            board[toRow][toCol] = movingPiece;
            board[fromRow][fromCol] = '.';
            turn = turn === 'w' ? 'b' : 'w';
            drawBoard();
            updateStatus();
            socket.emit('move', { fromRow, fromCol, toRow, toCol, turn });
        }
    }

    $('#board').on('click', '.square', function() {
        const row = parseInt($(this).attr('data-row'));
        const col = parseInt($(this).attr('data-col'));

        // 현재 플레이어의 차례에 해당하는 기물만 선택
        if (board[row][col] !== '.' && board[row][col][0] === turn) {
            $('.square').removeClass('selected');
            $(this).addClass('selected');
        } else if ($('.selected').length) {
            const fromRow = parseInt($('.selected').attr('data-row'));
            const fromCol = parseInt($('.selected').attr('data-col'));
            movePiece(fromRow, fromCol, row, col);
            $('.square').removeClass('selected');
        }
    });

    socket.on('move', (move) => {
        if (move.turn !== color) {
            movePiece(move.fromRow, move.fromCol, move.toRow, move.toCol);
        }
    });

    $('#white').click(() => {
        color = 'w';
        $('#color-selection').hide();
        drawBoard();
    });

    $('#black').click(() => {
        color = 'b';
        $('#color-selection').hide();
        drawBoard();
    });

    drawBoard();
    updateStatus();
});
