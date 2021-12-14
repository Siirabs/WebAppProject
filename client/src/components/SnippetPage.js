import { useEffect, useState } from "react";
import { useParams } from "react-router";

function SnippetPage() {
  const { id } = useParams();
  const [snippet, setSnippet] = useState();
  const [comment, setComment] = useState();
  useEffect(() => {
    fetch("/api/snippet/" + id, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((json) => setSnippet(json));
  }, [id]);
  if (!snippet) {
    return null;
  }

  return (
    <div>
      <h1>{snippet.title}</h1>
      <p>{snippet.snippet}</p>
    </div>
  );
}

export default SnippetPage;
