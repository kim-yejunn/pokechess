import React, { useEffect } from "react";
import socket from "../sockets";

function ChessBoard({ roomID }) {
  const handleMove = (move) => {
    socket.emit("move_piece", { room_id: roomID, move });
  };

  useEffect(() => {
    socket.on("piece_moved", (data) => {
      console.log("Piece moved:", data.move);
    });

    return () => {
      socket.off("piece_moved");
    };
  }, []);

  return <div>Chess Board Here (Add move handling)</div>;
}

export default ChessBoard;
