import React, { useState, useEffect } from "react";
import roomService from "../services/rooms";
import { useUser } from "../contexts/UserContext";

const ChatComponent = () => {
  const { username, room } = useUser();
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

    if (room && room.roomId) {
      roomService.listenForMessages(handleNewMessage, room.roomId); // Ensure you are listening to the right roomId

      // Setup room details listener
      roomService.listenForRoomDetails(room.roomId, (details) => {
        setRoomDetails(details);
      });

      // Cleanup function to remove listeners when component unmounts
      return () => {
        roomService.unsubscribeFromMessages(room.roomId);
        roomService.unsubscribeFromRoomDetails(room.roomId);
      };
    }
  }, [room]); // Depend on room to re-run these setups when it changes

  const handleMessageSend = () => {
    if (messageInput.trim() && room && room.roomId) {
      roomService.chatMessage(room.roomId, username, messageInput);
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
