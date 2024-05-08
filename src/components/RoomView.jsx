import React from "react";
import { useEffect } from "react";
import ChatComponent from "./ChatComponent";
import Gametable from "./Gametable";
import { useNavigate } from "react-router-dom";
import roomService from "../services/rooms";
import { useParams } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const RoomView = () => {
  const navigateTo = useNavigate();
  const { roomId } = useParams();
  const { username, room, setRoom } = useUser();

  useEffect(() => {
    console.log("Room data at load:", room); // Initial log to check what the room object contains

    roomService.listenForRoomDetails((roomDetails) => {
      console.log("Room details updated", roomDetails);
      setRoom(roomDetails); // Assuming setRoom is the correct method to update the room context
    });

    return () => {
      roomService.unsubscribeFromRoomDetails();
    };
  }, [roomId, setRoom]); // Ensure dependencies are correctly listed

  const handleLeaveRoom = () => {
    roomService.leaveRoom(roomId, username);
    navigateTo("/");
  };

  return (
    <div>
      <h1>Room: {roomId || "Loading Room ID..."}</h1>
      <h2>Username: {username}</h2>
      {roomId && room && (
        <>
          <ChatComponent roomId={roomId} username={username} />
          <Gametable roomId={roomId} username={username} />
          <button onClick={handleLeaveRoom}>Leave Room</button>
        </>
      )}
      {(!roomId || !room) && <p>Waiting for room information...</p>}
    </div>
  );
};

export default RoomView;
