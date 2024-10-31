from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# 초기 게임 상태
game_state = {
    'board': [['' for _ in range(6)] for _ in range(6)],
    'current_turn': 'white',  # white이 선공
    'selected_piece': None,
    'valid_moves': []
}

# 초기 말 위치 설정
def init_board():
    # 플레이어 말 (black)
    game_state['board'][0][1] = 'black'  # b1
    game_state['board'][1][2] = 'black'  # c2
    game_state['board'][1][3] = 'black'  # d2
    game_state['board'][0][4] = 'black'  # e1
    
    # 상대 말 (white)
    game_state['board'][5][1] = 'white'  # b6
    game_state['board'][4][2] = 'white'  # c5
    game_state['board'][4][3] = 'white'  # d5
    game_state['board'][5][4] = 'white'  # e6

# 가능한 이동 위치 계산
def get_valid_moves(row, col):
    valid_moves = []
    directions = [(-1,-1), (-1,0), (-1,1), (0,-1), (0,1), (1,-1), (1,0), (1,1)]
    
    for dx, dy in directions:
        new_row, new_col = row + dx, col + dy
        if 0 <= new_row < 6 and 0 <= new_col < 6:
            if game_state['board'][new_row][new_col] == '' or \
               (game_state['board'][new_row][new_col] != game_state['board'][row][col]):
                valid_moves.append([new_row, new_col])
    
    return valid_moves

@app.route('/')
def home():
    init_board()
    return render_template('index.html')

@app.route('/get_board')
def get_board():
    return jsonify(game_state)

@app.route('/select_piece', methods=['POST'])
def select_piece():
    data = request.get_json()
    row, col = data['row'], data['col']
    
    if game_state['board'][row][col] == game_state['current_turn']:
        game_state['selected_piece'] = [row, col]
        game_state['valid_moves'] = get_valid_moves(row, col)
        return jsonify({'status': 'success', 'valid_moves': game_state['valid_moves']})
    
    return jsonify({'status': 'error'})

@app.route('/move_piece', methods=['POST'])
def move_piece():
    data = request.get_json()
    to_row, to_col = data['row'], data['col']
    
    if game_state['selected_piece'] is None:
        return jsonify({'status': 'error'})
        
    from_row, from_col = game_state['selected_piece']
    
    if [to_row, to_col] in game_state['valid_moves']:
        # 이동 실행
        game_state['board'][to_row][to_col] = game_state['board'][from_row][from_col]
        game_state['board'][from_row][from_col] = ''
        
        # 턴 변경
        game_state['current_turn'] = 'white' if game_state['current_turn'] == 'black' else 'black'
        
        # 선택 초기화
        game_state['selected_piece'] = None
        game_state['valid_moves'] = []
        
        return jsonify({'status': 'success', 'board': game_state['board']})
        
    return jsonify({'status': 'error'})

if __name__ == '__main__':
    app.run(debug=True)