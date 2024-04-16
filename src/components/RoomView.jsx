// RoomView.jsx
import React from "react";
import { useState, useEffect } from "react";
import ChatComponent from "./ChatComponent";
import Gametable from "./Gametable";
import { useNavigate } from "react-router-dom";
import roomService from "../services/rooms";

const RoomView = ({ room, username }) => {

  const navigateTo = useNavigate();

  // handle leaving the room
  const handleLeaveRoom = () => {
    roomService.leaveRoom(room.roomId, username);
    navigateTo("/");
  };


  return (
    <div>
      <h1>Room: {room.roomId}</h1>
      <h2>Username: {username}</h2>
      <ChatComponent roomId={room.roomId} username={username} />
      <Gametable roomId={room.roomId} username={username} />
      <button onClick={handleLeaveRoom}>Leave Room</button>
    </div>
  );
};

export default RoomView;
