import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Snippets from "./components/Snippets";
import SnippetPage from "./components/SnippetPage";
import Navbar from "./components/navbar/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="snippet/:id" element={<SnippetPage />} />
        <Route path="/" element={<Snippets />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
