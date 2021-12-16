import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Comment from "./Comment";

//Styling for grid items
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function SnippetPage() {
  //getting snippetId from params
  const { id } = useParams();
  const [snippet, setSnippet] = useState();
  const [comment, setComment] = useState();

  const addComment = (newComment) => {
    setComment((data) => [...data, newComment]);
  };
  //fetching a specific snippet with its id
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
  //fetching comments to that specific snippet
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

  //Grid from MUI to show snippet and comments
  return (
    <Box sx={{ flexGrow: 1 }} className="box">
      <Grid
        container
        spacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        justifyContent="center"
        alignItems="center"
        direction="row"
      >
        <Grid item xs={8}>
          <Item className="snippet">
            <h3>{snippet.title}</h3>
            <p>{snippet.snippet}</p>
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Comment addComment={addComment}></Comment>
        </Grid>
        <Grid item xs={6} style={{ marginTop: "30px" }}>
          {comment.map((comment) => (
            <Item
              className="comment"
              key={comment._id}
              style={{ marginBottom: "5px" }}
            >
              <p>{comment.comment}</p>
            </Item>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}

export default SnippetPage;
