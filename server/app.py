from flask import Flask, request
from flask_socketio import SocketIO, emit, join_room, leave_room

app = Flask(__name__)
# app.config['SECRET_KEY'] = 'your_secret_key'
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def index():
    return "Chess Real-Time Server Running"

@socketio.on('join_game')
def handle_join(data):
    room = data['room']
    join_room(room)
    emit('message', {'msg': 'A new player has joined the game!'}, room=room)

@socketio.on('move_piece')
def handle_move(data):
    room = data['room']
    move_data = data['move']
    emit('update_board', move_data, room=room)


@socketio.on('send_message')
def handle_message(data):
    print(f"Message received: {data['msg']}")
    emit('receive_message', {'msg': data['msg']}, broadcast=True)  # Send message to all clients





if __name__ == '__main__':
    socketio.run(app)