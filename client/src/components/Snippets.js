import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Snippet from "./Snippet";
/*import "../snippets.css";*/

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
          <Grid item xs={6}>
            {data.map((snippet) => (
              <Item
                key={snippet._id}
                onClick={() => navigate("/snippet/" + snippet.snippetId)}
                className="snippet"
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
