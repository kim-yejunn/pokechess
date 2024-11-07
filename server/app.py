from flask import Flask, send_from_directory
from flask_socketio import SocketIO, emit, join_room

app = Flask(__name__, static_folder='client/build')
socketio = SocketIO(app, cors_allowed_origins="*")

# Initialize the chessboard state here
chessboard_state = {}

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@socketio.on('join_game')
def handle_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    emit('update_board', chessboard_state, room=room)

@socketio.on('move_piece')
def handle_move_piece(data):
    source = data['source']
    target = data['target']
    chessboard_state[target] = chessboard_state.pop(source)
    emit('update_board', chessboard_state, room=data['room'])

if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", port=5000)