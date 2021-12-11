import { useState } from "react";

function Register() {
  const [userData, setUserData] = useState({});
  const submit = (e) => {
    e.preventDefault();
    fetch("/users/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
      mode: "cors",
    });
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
