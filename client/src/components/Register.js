import { useState } from "react";

function Register() {
  const [userData, setUserData] = useState({});
  const submit = (e) => {
    e.preventDefault();
    //Posting new user to backend
    fetch("/users/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
      mode: "cors",
    });
    //redirecting user to login screen after successful register
    window.location.href = "/login";
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h2>Register</h2>
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

export default Register;
