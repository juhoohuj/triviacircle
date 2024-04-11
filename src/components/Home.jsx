import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomView from "./RoomView";
import socket from "../socket";

const Home = () => {
  console.log("Home component rendering");
  const [roomCode, setRoomCode] = useState("");
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState(null);
  const navigateTo = useNavigate();

  console.log("attempting to connect to server");

  socket.on("connect", () => {
    console.log(`Connected to server with socket ID: ${socket.id}`);
  });

  socket.on("connect_error", (err) => {
    console.error("Connection Error:", err.message);
  });

  const handleCreateRoom = () => {
    // Emit event to create a room
    socket.emit("createRoom", { username });

    // Listen for a response from the server
    socket.once("createRoomSuccess", (newRoom) => {
      console.log(newRoom.id);
      navigateTo(`/room/${newRoom.id}`);
    });

    // Optional: Listen for an error event
    socket.once("createRoomError", (error) => {
      console.log(error);
    });
  };

  return (
    <div>
      {!room ? (
        <div>
          <h1>Welcome to the Home Page</h1>
          <p>Enter your name: </p>
          <input
            type="text"
            placeholder="Name..."
            onChange={(e) => setUsername(e.target.value)}
          />

          <p>Join an existing game: </p>
          <input
            type="text"
            placeholder="Room Code..."
            onChange={(e) => setRoomCode(e.target.value)}
          />
          <button onClick={handleJoinRoom}>Join Game</button>

          <p>Create a new game: </p>
          <button onClick={handleCreateRoom}>Create Game</button>
        </div>
      ) : (
        <RoomView room={room} username={username} />
      )}
    </div>
  );
};

export default Home;
