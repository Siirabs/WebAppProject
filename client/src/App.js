import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Snippets from "./components/Snippets";
import Snippet from "./components/Snippet";
import SnippetPage from "./components/SnippetPage";
import Comment from "./components/Comment";
import Navbar from "./components/navbar/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="snippet/:id"
          element={
            <>
              <SnippetPage /> <Comment />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <Snippet />
              <Snippets />
            </>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
