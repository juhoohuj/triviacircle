import React, { useState, useEffect } from "react";
import roomService from "../services/rooms";

const ChatComponent = ({ roomId, username }) => {
  const [messages, setMessages] = useState([
    { username: "Admin", text: "Welcome to the chat!" },
    { username: "Admin", text: "Please be respectful!" },
  ]);
  const [messageInput, setMessageInput] = useState("");
  const [roomDetails, setRoomDetails] = useState(null);

  useEffect(() => {
    // Setup message listener
    const handleNewMessage = (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    };

    roomService.listenForMessages(handleNewMessage);

    // Setup room details listener
    roomService.listenForRoomDetails((details) => {
      setRoomDetails(details);
    });

    // Cleanup function to remove listeners when component unmounts
    return () => {
      roomService.unsubscribeFromMessages();
      roomService.unsubscribeFromRoomDetails();
    };
  }, []);

  const handleMessageSend = () => {
    if (messageInput.trim()) {
      roomService.chatMessage(roomId, username, messageInput);
      setMessageInput("");
    }
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
      <div>
        <h2>Room Details</h2>
        {roomDetails ? (
          <div>
            <p>Room ID: {roomDetails.roomId}</p>
            <p>Users:</p>
            <ul>
              {roomDetails.users.map((user, index) => <li key={index}>{user.username}</li>)}
            </ul>
          </div>
        ) : (
          <p>Loading room details...</p>
        )}
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