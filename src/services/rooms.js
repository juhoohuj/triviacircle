import io from "socket.io-client";

const socket = io(); // Establish a connection with the Socket.IO server

const joinRoom = (roomId, username) => {
  // Emit the joinRoom event when the roomId and username are available
  socket.emit("joinRoom", { roomId, username });
};

const leaveRoom = (roomId, username) => {
  // Emit the leaveRoom event to the server
  socket.emit("leaveRoom", { roomId, username });
};

const createRoom = (username) => {
  // Emit the createRoom event to the server
  socket.emit("createRoom", { username });
};

const sendMessage = (roomId, username, message) => {
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
  sendMessage,
  listenForMessages,
  disconnectSocket,
  createRoom,
};
