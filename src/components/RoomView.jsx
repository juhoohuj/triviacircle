import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatComponent from "./ChatComponent";
import Gametable from "./Gametable";
import roomService from "../services/rooms";
import { useUser } from "../contexts/UserContext";

const RoomView = () => {
	const navigate = useNavigate();
	const { roomId } = useParams();
	const { username, room, setRoom } = useUser();
	console.log("Room ID:", roomId);
	console.log("Username:", username);
	console.log("Room:", room);

	useEffect(() => {
		if (roomId && username) {
			roomService.joinRoom(roomId, username, {
				onSuccess: (room) => {
					console.log("Joined room:", room);
					setRoom(room);
				},
				onError: (error) => {
					console.error("Error joining room:", error);
					navigate("/");
				},
			});
		}
	}, [roomId, username, setRoom, navigate]);

	const handleLeaveRoom = () => {
		roomService.leaveRoom(roomId, username);
		navigate("/");
	};

	return (
		<div>
			<h1>Room: {roomId || "Loading Room ID..."}</h1>
			<h2>Username: {username}</h2>
			{roomId && room ? (
				<>
					<ChatComponent />
					<Gametable roomId={roomId} username={username} />
					<button onClick={handleLeaveRoom}>Leave Room</button>
				</>
			) : (
				<p>Waiting for room information...</p>
			)}
		</div>
	);
};

export default RoomView;
