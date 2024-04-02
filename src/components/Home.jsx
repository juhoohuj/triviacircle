import roomService from "../services/rooms";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomView from "./RoomView";

const Home = () => {
  const [roomCode, setRoomCode] = useState("");
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState(null);
  const navigateTo = useNavigate();

  const handleJoinRoom = async () => {
    // Call roomService.joinRoom which emits socket event to join the room
    await roomService.joinRoom(roomCode, username);

    if (roomCode) {
      setRoom({ id: roomCode, username });
      // Navigate to the room URL
      navigateTo(`/room/${roomCode}`);
    }
    if (!username) {
      alert("Please enter a room code and username to join a room");
    }
  };

  const handleCreateRoom = async () => {
    // Call roomService.createRoom which emits socket event to create a room
    const newRoom = await roomService.createRoom(username);
    console.log(newRoom);

    navigateTo(`/room/${newRoom.id}`);
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
