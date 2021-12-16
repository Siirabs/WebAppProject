import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Snippet from "./Snippet";

//Styling for grid items
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Snippets() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const addSnippet = (newSnippet) => {
    setData((data) => [...data, newSnippet]);
  };
  //Fetching all snippets from backend
  useEffect(() => {
    fetch("/api/snippets", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }, []);
  if (!data) {
    return null;
  }
  //Grid from MUI to show snippets
  return (
    <>
      <Snippet addSnippet={addSnippet}></Snippet>
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
            {data.map((snippet) => (
              <Item
                key={snippet._id}
                //Navigating to specific snippet with snippetId
                onClick={() => navigate("/snippet/" + snippet.snippetId)}
                className="snippet"
                style={{ marginBottom: "3px" }}
              >
                <h3>{snippet.title}</h3>
                {snippet.snippet}
              </Item>
            ))}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Snippets;
