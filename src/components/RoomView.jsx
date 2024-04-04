// RoomView.jsx
import React from "react";
import ChatComponent from "./ChatComponent";

const RoomView = ({ room, username }) => {
  return (
    <div>
      <h1>Room: {room.roomId}</h1>
      <h2>Username: {username}</h2>
      <ChatComponent roomId={room.roomId} username={username} />
    </div>
  );
};

export default RoomView;
