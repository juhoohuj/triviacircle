// RoomView.jsx
import React from "react";
import ChatComponent from "./ChatComponent";

const RoomView = ({ room }) => {
  return (
    <div>
      <h1>Room: {room.id}</h1>
      <h2>Username: {room.username}</h2>
      <ChatComponent roomId={room.id} username={room.username} />
    </div>
  );
};

export default RoomView;
