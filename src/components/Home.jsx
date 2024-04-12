import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomView from "./RoomView";
import roomService from "../services/rooms";

const Home = () => {
  const [roomCode, setRoomCode] = useState("");
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState(null);
  const navigateTo = useNavigate();

  const handleJoinRoom = () => {
    console.log("Joining room");
    roomService.joinRoom(roomCode, username, {
      onSuccess: (room) => {
        setRoom(room);
        navigateTo(`/room/${room.roomId}`);
      },
      onError: (error) => {
        console.error("Error joining room:", error);
        // Handle error (e.g., show message to user)
      }
    });
  };

  const handleCreateRoom = () => {
    console.log("Creating room");
    roomService.createRoom(username, {
      onSuccess: (room) => {
        setRoom(room);
        navigateTo(`/room/${room.roomId}`);
      },
      onError: (error) => {
        console.error("Error creating room:", error);
        // Handle error (e.g., show message to user)
      }
    });
  };

  return (
    <div>
      {!room ? (
        <div>
          <h1>Welcome to the Home Page</h1>
          <p>Enter your name:</p>
          <input
            type="text"
            placeholder="Name..."
            onChange={(e) => setUsername(e.target.value)}
          />

          <p>Join an existing game:</p>
          <input
            type="text"
            placeholder="Room Code..."
            onChange={(e) => setRoomCode(e.target.value)}
          />
          <button onClick={handleJoinRoom}>Join Game</button>

          <p>Create a new game:</p>
          <button onClick={handleCreateRoom}>Create Game</button>
        </div>
      ) : (
        <RoomView room={room} username={username} />
      )}
    </div>
  );
};

export default Home;
