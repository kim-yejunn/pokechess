$(function() {
    let color;
    let turn = 'w';
    const socket = io();

    // 초기 체스판 설정: 흰색 왕(T)은 아래쪽 두 칸, 검은색 왕(T)은 위쪽 두 칸 차지
    const board = [
        ['.', '.', '.', '.', '.', '.'],
        ['.', '.', 'bA', '.', 'bB', '.'],
        ['.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.'],
        ['.', '.', 'wT', 'wT', '.', '.']
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
        // 왕(T)은 이동할 수 없도록 설정
        if (board[fromRow][fromCol] === 'T') {
            return;
        }

        // 한 칸 내에서만 이동 가능하도록 설정하고 빈 칸일 때만 이동 가능
        if (board[toRow][toCol] === '.' && Math.abs(fromRow - toRow) <= 1 && Math.abs(fromCol - toCol) <= 1) {
            board[toRow][toCol] = board[fromRow][fromCol];
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

        if (board[row][col].toLowerCase() === turn) {
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
