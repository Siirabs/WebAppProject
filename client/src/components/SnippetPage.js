import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../snippets.css";

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

  useEffect(() => {
    fetch("/api/comments/" + id, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((json) => setComment(json));
  }, [id]);
  if (!snippet) {
    return null;
  }
  if (!comment) {
    return null;
  }

  return (
    <div className="box">
      <h1>{snippet.title}</h1>
      <p>{snippet.snippet}</p>
      <p>{comment.comment}</p>
    </div>
  );
}

export default SnippetPage;
