from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room

app = Flask(__name__)
CORS(app)  # HTTP 요청에 대한 CORS 적용
socketio = SocketIO(app, cors_allowed_origins="*")  # WebSocket 요청에 대한 CORS 적용

# Initialize the chessboard state here
chessboard_state = {
    'A1': '', 'B1': '/pic_img/bK.png', 'C1': '/pic_img/bT.png', 'D1': '/pic_img/bT.png', 'E1': '/pic_img/bK.png', 'F1': '',
    'A2': '', 'B2': '', 'C2': '/pic_img/bK.png', 'D2': '/pic_img/bK.png', 'E2': '', 'F2': '',
    'A3': '', 'B3': '', 'C3': '', 'D3': '', 'E3': '', 'F3': '',
    'A4': '', 'B4': '', 'C4': '', 'D4': '', 'E4': '', 'F4': '',
    'A5': '', 'B5': '', 'C5': '/pic_img/wK.png', 'D5': '/pic_img/wK.png', 'E5': '', 'F5': '',
    'A6': '', 'B6': '/pic_img/wK.png', 'C6': '/pic_img/wT.png', 'D6': '/pic_img/wT.png', 'E6': '/pic_img/wK.png', 'F6': '',
}

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@socketio.on('join_game')
def handle_join(data):
    room = data['room']
    join_room(room)
    emit('update_board', chessboard_state, room=room)

@socketio.on('move_piece')
def handle_move_piece(data):
    source = data['source']
    target = data['target']
    source_key = f"{chr(65 + source['col'])}{source['row'] + 1}"
    target_key = f"{chr(65 + target['col'])}{target['row'] + 1}"
    chessboard_state[target_key] = chessboard_state.pop(source_key)
    emit('update_board', chessboard_state, room=data['room'])

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000)
