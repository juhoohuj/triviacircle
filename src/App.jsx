import "./App.css";
import Gametable from "./components/Gametable";
import Home from "./components/Home";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Home />
      </div>
    </Router>
  );
}

export default App;
