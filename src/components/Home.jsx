import roomService from "../services/rooms";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom
import RoomView from "./RoomView";

const Home = () => {
  const [roomCode, setRoomCode] = useState("");
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState(null);
  const navigateTo = useNavigate(); // Initialize useHistory

  const handleJoinRoom = async () => {
    const room = await roomService.joinRoom(roomCode, username);
    if (room) {
      setRoom(room);
      console.log("Room found: ", room);
      // Navigate to the room URL when room is found
      navigateTo(`/room/${roomCode}`);
    }
  };

  const handleCreateRoom = async () => {
    const room = await roomService.createRoom(username);
    setRoom(room);
    console.log("Room created: ", room);
    // Navigate to the room URL when room is created
    navigateTo(`/room/${room.id}`);
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
        <RoomView room={room} />
      )}
    </div>
  );
};

export default Home;
