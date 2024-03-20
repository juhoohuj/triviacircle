// ChatComponent.jsx
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import roomService from "../services/rooms"; // Import your room service

const ChatComponent = ({ roomId, username }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Establish a connection with the Socket.IO server
    const newSocket = io();
    setSocket(newSocket);

    // Clean up the socket connection when the component unmounts
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket) {
      // Emit the joinRoom event when the roomId and username are available
      socket.emit("joinRoom", { roomId, username });

      // Listen for incoming messages from the server and update the state
      socket.on("message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    // Clean up the room when the component unmounts or the roomId/username changes
    return () => {
      if (socket) {
        socket.emit("leaveRoom", { roomId, username });
      }
    };
  }, [socket, roomId, username]);

  // Function to handle sending messages
  const handleMessageSend = () => {
    if (messageInput.trim() === "") return;
    // Emit the chatMessage event to the server
    socket.emit("chatMessage", { roomId, username, message: messageInput });
    setMessageInput("");
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.username}: </strong>
            {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleMessageSend}>Send</button>
    </div>
  );
};

export default ChatComponent;
