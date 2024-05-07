import React from "react";
import { useEffect } from "react";
import ChatComponent from "./ChatComponent";
import Gametable from "./Gametable";
import { useNavigate } from "react-router-dom";
import roomService from "../services/rooms";
import { useParams } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const RoomView = ({ }) => {
  const navigateTo = useNavigate();
  const { roomId } = useParams();
  const { username, setUsername, room, setRoom } = useUser();
  console.log("Room ID:", room, "Username:", username);

  useEffect(() => {
    // Subscribe to room details
    roomService.listenForRoomDetails((roomDetails) => {
      console.log("Room details updated", roomDetails);
      // Here you would handle the incoming room details. For instance, you might want to update the state in a parent component or handle it in some other way.
    });

    // Return cleanup function
    return () => {
      roomService.unsubscribeFromRoomDetails();
    };
  }, [roomId]); // This effect runs only when roomId changes

  // handle leaving the room
  const handleLeaveRoom = () => {
    roomService.leaveRoom(roomId, username);
    navigateTo("/");
  };

  // Render the components only when roomId and room are valid
  return (
    <div>
      <h1>Room: {roomId || "Loading Room ID..."}</h1>
      <h2>Username: {username}</h2>
      {roomId && (
        <>
          <ChatComponent roomId={roomId} username={username} />
          <Gametable roomId={roomId} username={username} />
          <button onClick={handleLeaveRoom}>Leave Room</button>
        </>
      )}
      {!roomId && <p>Waiting for room information...</p>}
    </div>
  );
};

export default RoomView;
