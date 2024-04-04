import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:3000"); // Establish a connection with the Socket.IO server
const baseUrl = "http://localhost:3000";

const joinRoom = async (roomId, username) => {
  // Emit the joinRoom event to the server
  socket.emit("joinRoom", { roomId, username });

  try {
    const response = await axios.post(`${baseUrl}/joinroom`, {
      roomId,
      username,
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("There was an error!", error);
    throw error; // Rethrow error for caller to handle if necessary
  }

};

const leaveRoom = (roomId, username) => {
  // Emit the leaveRoom event to the server
  socket.emit("leaveRoom", { roomId, username });
};

const createRoom = (username) => {
  // Emit the createRoom event to the server
  socket.emit("createRoom", { username });
};

const chatMessage = (roomId, username, message) => {
  // Emit the chatMessage event to the server
  socket.emit("chatMessage", { roomId, username, message });
  console.log("Chat message sent");
};

const listenForMessages = (callback) => {
  // Listen for incoming messages from the server and invoke the callback
  socket.on("message", callback);
};

const disconnectSocket = () => {
  // Close the socket connection
  socket.close();
};

export default {
  joinRoom,
  leaveRoom,
  chatMessage,
  listenForMessages,
  disconnectSocket,
  createRoom,
};
