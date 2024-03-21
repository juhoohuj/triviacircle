import React, { useState, useEffect } from "react";
import roomService from "../services/rooms";

const ChatComponent = ({ roomId, username }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    // Join the room when the component mounts
    roomService.joinRoom(roomId, username);

    // Clean up the room when the component unmounts
    return () => {
      roomService.leaveRoom(roomId, username);
      roomService.disconnectSocket(); // Optionally close the socket connection
    };
  }, [roomId, username]);

  useEffect(() => {
    // Listen for incoming messages from the server and update the state
    roomService.listenForMessages((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const handleMessageSend = () => {
    if (messageInput.trim() === "") return;
    // Send chat message to the server
    roomService.sendMessage(roomId, username, messageInput);
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
