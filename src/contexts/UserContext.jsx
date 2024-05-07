import React, { createContext, useContext, useState } from 'react';

// Create the context
const UserContext = createContext(null);

// Custom hook for easy use of the context
const useUser = () => useContext(UserContext);

// Provider component that wraps your app and provides the context
const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState(null);

  const value = {
    username,
    setUsername,
    room,
    setRoom
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
  
export { UserProvider, useUser };