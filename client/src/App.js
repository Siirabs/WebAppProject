import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Snippets from "./components/Snippets";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>Moi</div>
      <Routes>
        <Route path="/" element={<Snippets />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
