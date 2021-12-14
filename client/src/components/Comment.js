import { useState } from "react";
import { useParams } from "react-router";

function Comment() {
  const { id } = useParams();
  const [commentData, setCommentData] = useState({});
  const authToken = localStorage.getItem("auth_token");
  const submit = (e) => {
    e.preventDefault();
    fetch("/api/comment", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        comment: commentData.comment,
        snippetId: id,
      }),
      mode: "cors",
    });
  };
  const handleChange = (e) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
  };
  return (
    <div>
      {authToken && <h2>Add a comment</h2> && (
        <form onSubmit={submit} onChange={handleChange}>
          <input
            type="string"
            id="comment"
            placeholder="comment"
            name="comment"
          />
          <input type="submit" id="submit" />
        </form>
      )}
    </div>
  );
}

export default Comment;
