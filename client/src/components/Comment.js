import { useState } from "react";
import { useParams } from "react-router";

function Comment(props) {
  const { id } = useParams();
  const [commentData, setCommentData] = useState({});
  const authToken = localStorage.getItem("auth_token");
  const submit = async (e) => {
    e.preventDefault();
    await fetch("/api/comment", {
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
    props.addComment(commentData);
  };
  const handleChange = (e) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
  };
  return (
    <div className="addComment">
      {authToken && <h2>Add a comment</h2> && (
        <form onSubmit={submit} onChange={handleChange}>
          <textarea
            type="string"
            id="comment"
            placeholder="comment"
            name="comment"
            className="commentInput"
          />
          <input type="submit" id="submit" value="Post" />
        </form>
      )}
    </div>
  );
}

export default Comment;
