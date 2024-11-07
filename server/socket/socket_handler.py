# # socket_handler.py
# from flask_socketio import emit, join_room
# from app import socketio

# # Initialize the chessboard state here
# chessboard_state = {}

# @socketio.on('join_game')
# def handle_join(data):
#     username = data['username']
#     room = data['room']
#     join_room(room)
#     emit('update_board', chessboard_state, room=room)

# @socketio.on('move_piece')
# def handle_move_piece(data):
#     source = data['source']
#     target = data['target']
#     chessboard_state[target] = chessboard_state.pop(source)
#     emit('update_board', chessboard_state, room=data['room'])

