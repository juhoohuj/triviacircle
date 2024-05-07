import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import roomService from "../services/rooms";

const RoomLobby = ({ room, username }) => {

  const navigateTo = useNavigate();

  // handle leaving the room
  const handleLeaveRoom = () => {
    roomService.leaveRoom(room.roomId, username);
    
    //navigate back to the home page
    navigateTo("/");
  };



  return (
    <div>
      <h1>Room: {room.roomId}</h1>
      <h2>Username: {username}</h2>
      <button onClick={handleLeaveRoom}>Leave Room</button>
    </div>
  );
}


export default RoomLobby;