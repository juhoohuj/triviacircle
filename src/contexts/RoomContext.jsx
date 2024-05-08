
import React, { createContext, useContext, useState } from 'react';

// Create the context
const RoomContext = createContext(null);

// Custom hook for easy use of the context

const useRoom = () => useContext(RoomContext);

// Provider to use currents rooms players stats anywhere

const RoomProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);

  const value = {
    players,
    setPlayers,
  };

  return (
    <RoomContext.Provider value={value}>
      {children}
    </RoomContext.Provider>
  );
}