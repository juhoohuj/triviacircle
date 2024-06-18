import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Home from "./components/Home";
import RoomView from "./components/RoomView";
import "./App.css";

const App = () => {
	return (
		<div className="App">
			<UserProvider>
				<Router>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/room/:roomId" element={<RoomView />} />
					</Routes>
				</Router>
			</UserProvider>
		</div>
	);
};

export default App;
