


{/*const joinRoom = async (roomId, username) => {
  // Emit the joinRoom event to the server
  socket.emit("joinRoom", { roomId, username });
};

const leaveRoom = (roomId, username) => {
  // Emit the leaveRoom event to the server
  socket.emit("leaveRoom", { roomId, username });
};*/}

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

const listenForRoomDetails = (callback) => {
  // Listen for roomDetails event and invoke the callback
  socket.on("roomDetails", callback);
};

const unsubscribeFromRoomDetails = () => {
  // Stop listening for roomDetails event
  socket.off("roomDetails");
};

export default {
  chatMessage,
  listenForMessages,
  disconnectSocket,
  createRoom,
  listenForRoomDetails,
  unsubscribeFromRoomDetails,
};
