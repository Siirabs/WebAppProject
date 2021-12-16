import { useState } from "react";
import "../snippets.css";
function Snippet(props) {
  const [snippetData, setSnippetData] = useState({});
  //getting jwt token from localstorage
  const authToken = localStorage.getItem("auth_token");
  const submit = async (e) => {
    e.preventDefault();
    //Posting a new snippet and verifying user
    await fetch("/api/snippet", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-type": "application/json",
      },
      body: JSON.stringify(snippetData),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((json) => props.addSnippet(json));
  };
  const handleChange = (e) => {
    setSnippetData({ ...snippetData, [e.target.name]: e.target.value });
  };
  //if token exists then input fields are visible.
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
