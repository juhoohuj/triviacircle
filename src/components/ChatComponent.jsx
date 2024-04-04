import React, { useState, useEffect, useRef } from "react";
import roomService from "../services/rooms";

const ChatComponent = ({ roomId, username }) => {
  const [messages, setMessages] = useState([
    { username: "Admin", text: "Welcome to the chat!" },
    { username: "Admin", text: "Please be respectful!" },
  ]);
  const [messageInput, setMessageInput] = useState("");

  const isListenerRegistered = useRef(false);

  useEffect(() => {
    // Register listener for incoming messages only once
    if (!isListenerRegistered.current) {
      roomService.listenForMessages((message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      // Update the ref to indicate that the listener has been registered
      isListenerRegistered.current = true;
    }
  }, []);

  const handleMessageSend = () => {
    if (messageInput.trim() === "") return;
    // Send chat message to the server
    roomService.chatMessage(roomId, username, messageInput);
    setMessageInput("");
  };

  return (
    <div>
      <div>
        <h2>Chat</h2>
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
