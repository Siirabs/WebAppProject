import { useState } from "react";
import "../snippets.css";
function Snippet() {
  const [snippetData, setSnippetData] = useState({});
  const authToken = localStorage.getItem("auth_token");
  const submit = (e) => {
    e.preventDefault();
    fetch("/api/snippet", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-type": "application/json",
      },
      body: JSON.stringify(snippetData),
      mode: "cors",
    });
    window.location.reload();
  };
  const handleChange = (e) => {
    setSnippetData({ ...snippetData, [e.target.name]: e.target.value });
  };
  return (
    <div className="addSnippet">
      {authToken && <h2>Add a snippet</h2> && (
        <form onSubmit={submit} onChange={handleChange} className="form">
          <input
            type="string"
            id="title"
            placeholder="title"
            name="title"
            className="title"
          />
          <textarea
            type="string"
            id="snippet"
            placeholder="snippet"
            name="snippet"
            className="snippet"
          />
          <input type="submit" id="submit" value="Post" className="submit" />
        </form>
      )}
    </div>
  );
}

export default Snippet;
