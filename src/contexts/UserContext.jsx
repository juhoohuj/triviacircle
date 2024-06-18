import React, { createContext, useContext, useEffect, useState } from "react";

// Create the context
const UserContext = createContext(null);

// Custom hook for easy use of the context
const useUser = () => useContext(UserContext);

// Provider component that wraps your app and provides the context
const UserProvider = ({ children }) => {
	const [username, setUsername] = useState("");
	const [room, setRoom] = useState(null);
	const [roomDetails, setRoomDetails] = useState(null);

	const value = {
		username,
		setUsername,
		room,
		setRoom,
		roomDetails,
		setRoomDetails,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserProvider, useUser };
