import { useState } from "react";

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
  };
  const handleChange = (e) => {
    setSnippetData({ ...snippetData, [e.target.name]: e.target.value });
  };
  return (
    <div>
      {authToken && <h2>Add a snippet</h2> && (
        <form onSubmit={submit} onChange={handleChange}>
          <input type="string" id="title" placeholder="title" name="title" />
          <input
            type="string"
            id="snippet"
            placeholder="snippet"
            name="snippet"
          />
          <input type="submit" id="submit" />
        </form>
      )}
    </div>
  );
}

export default Snippet;
