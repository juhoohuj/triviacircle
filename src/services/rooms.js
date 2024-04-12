import socket from "../socket";

const joinRoom = (roomId, username, callbacks) => {
  socket.emit("joinRoom", { roomId, username });

  socket.on("joinRoomSuccess", (room) => {
    callbacks.onSuccess(room);
    // Clean up listeners after successful operation
    socket.off("joinRoomSuccess");
    socket.off("joinRoomError");
  });

  socket.on("joinRoomError", (error) => {
    callbacks.onError(error);
    // Clean up listeners after error
    socket.off("joinRoomSuccess");
    socket.off("joinRoomError");
  });
};

const leaveRoom = (roomId, username) => {
  socket.emit("leaveRoom", { roomId, username });
};

const createRoom = (username, callbacks) => {
  socket.emit("createRoom", { username });

  socket.on("createRoomSuccess", (room) => {
    callbacks.onSuccess(room);
    socket.off("createRoomSuccess");
    socket.off("createRoomError");
  });

  socket.on("createRoomError", (error) => {
    callbacks.onError(error);
    socket.off("createRoomSuccess");
    socket.off("createRoomError");
  });
};

const chatMessage = (roomId, username, message) => {
  socket.emit("chatMessage", { roomId, username, message });
};

const listenForMessages = (callback) => {
  socket.on("message", callback);
};

const unsubscribeFromMessages = () => {
  socket.off("message");
};

const listenForRoomDetails = (callback) => {
  socket.on("roomDetails", callback);
};

const unsubscribeFromRoomDetails = () => {
  socket.off("roomDetails");
};

const disconnectSocket = () => {
  socket.close();
};

export default {
  joinRoom,
  leaveRoom,
  chatMessage,
  listenForMessages,
  unsubscribeFromMessages,
  disconnectSocket,
  createRoom,
  listenForRoomDetails,
  unsubscribeFromRoomDetails,
};
