from flask import Flask, render_template
from flask_socketio import SocketIO, join_room, leave_room, emit

app = Flask(__name__, static_folder="../client/build", static_url_path="/")
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route("/")
def index():
    return app.send_static_file("index.html")

# 소켓 이벤트 처리 예시
@socketio.on("create_room")
def handle_create_room(data):
    room_id = data["room_id"]
    join_room(room_id)
    emit("room_created", {"room_id": room_id}, room=room_id)

if __name__ == "__main__":
    socketio.run(app, debug=True)
