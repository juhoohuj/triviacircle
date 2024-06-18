import socket from "../socket";

const ensureFunction = (callback) => {
	return typeof callback === "function" ? callback : () => {};
};

const joinRoom = (roomId, username, callbacks = {}) => {
	const { onSuccess = () => {}, onError = () => {} } = callbacks;

	socket.emit("joinRoom", { roomId, username });

	const handleSuccess = (room) => {
		if (typeof onSuccess === "function") {
			onSuccess(room);
		}
		cleanup();
	};

	const handleError = (error) => {
		if (typeof onError === "function") {
			onError(error);
		}
		cleanup();
	};

	const cleanup = () => {
		socket.off("joinRoomSuccess", handleSuccess);
		socket.off("joinRoomError", handleError);
	};

	socket.on("joinRoomSuccess", handleSuccess);
	socket.on("joinRoomError", handleError);

	return cleanup;
};

const leaveRoom = (roomId, username) => {
	socket.emit("leaveRoom", { roomId, username });
};

const createRoom = (username, callbacks = {}) => {
	const { onSuccess = () => {}, onError = () => {} } = callbacks;

	socket.emit("createRoom", { username });

	const handleSuccess = (room) => {
		if (typeof onSuccess === "function") {
			onSuccess(room);
		}
		cleanup();
	};

	const handleError = (error) => {
		if (typeof onError === "function") {
			onError(error);
		}
		cleanup();
	};

	const cleanup = () => {
		socket.off("roomCreated", handleSuccess);
		socket.off("error", handleError);
	};

	socket.on("roomCreated", handleSuccess);
	socket.on("error", handleError);

	return cleanup;
};

const chatMessage = (roomId, username, message) => {
	socket.emit("chatMessage", { roomId, username, message });
};

const listenForMessages = (callback) => {
	const safeCallback = ensureFunction(callback);
	socket.on("message", safeCallback);
	return () => socket.off("message", safeCallback);
};

const listenForRoomDetails = (callback) => {
	const safeCallback = ensureFunction(callback);
	socket.on("roomDetails", safeCallback);
	return () => socket.off("roomDetails", safeCallback);
};

const disconnectSocket = () => {
	socket.close();
};

export default {
	joinRoom,
	leaveRoom,
	createRoom,
	chatMessage,
	listenForMessages,
	listenForRoomDetails,
	disconnectSocket,
};
