import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Snippets() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
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
        //console.log(json);
      });
  }, []);
  if (!data) {
    return null;
  }

  return (
    <div>
      {data.map((snippet) => (
        <div
          key={snippet._id}
          onClick={() => navigate("/snippet/" + snippet.snippetId)}
        >
          {snippet.snippet}
        </div>
      ))}
    </div>
  );
}

export default Snippets;
