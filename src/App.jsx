import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Home from './components/Home';
import RoomView from './components/RoomView';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:roomId" element={<RoomView />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
