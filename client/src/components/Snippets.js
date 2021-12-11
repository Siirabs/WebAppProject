import { useEffect, useState } from "react";

function Snippets() {
  const [data, setData] = useState([]);
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
        console.log(json);
      });
  }, []);
  if (!data) {
    return null;
  }

  return (
    <div>
      {data.map((snippet) => (
        <div>{snippet.snippet}</div>
      ))}
    </div>
  );
}

export default Snippets;
