import { useState } from "react";

function Login() {
  const [userData, setUserData] = useState({});
  const submit = (e) => {
    e.preventDefault();
    fetch("/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          storeToken(data.token);
          window.location.href = "/";
        }
      });
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit} on onChange={handleChange}>
        <input
          type="string"
          id="email"
          placeholder="email"
          name="email"
        ></input>
        <input
          type="string"
          id="password"
          placeholder="password"
          name="password"
        ></input>
        <input type="submit" id="submit" />
      </form>
    </div>
  );
}

function storeToken(token) {
  localStorage.setItem("auth_token", token);
  window.location.href = "/";
}
export default Login;
