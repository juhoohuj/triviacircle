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
		if (room && room.roomId) {
			const handleNewMessage = (message) => {
				setMessages((prevMessages) => [...prevMessages, message]);
			};

			const handleRoomDetails = (details) => {
				setRoomDetails(details);
			};

			// These should return functions for unsubscribing
			const unsubscribeMessages =
				roomService.listenForMessages(handleNewMessage);
			const unsubscribeDetails =
				roomService.listenForRoomDetails(handleRoomDetails);

			return () => {
				unsubscribeMessages(); // Unsubscribe from message events
				unsubscribeDetails(); // Unsubscribe from room details events
			};
		}
	}, [room]);

	const handleMessageSend = () => {
		if (messageInput.trim()) {
			roomService.chatMessage(room.roomId, username, messageInput);
			setMessageInput("");
		}
	};

	return (
		<div>
			<h2>Chat</h2>
			{messages.map((message, index) => (
				<div key={index}>
					<strong>{message.username}: </strong>
					{message.text}
				</div>
			))}
			<div>
				<h2>Room Details</h2>
				{roomDetails ? (
					<div>
						<p>Room ID: {roomDetails.roomId}</p>
						<p>Users:</p>
						<ul>
							{roomDetails.users.map((user, index) => (
								<li key={index}>{user.username}</li>
							))}
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
