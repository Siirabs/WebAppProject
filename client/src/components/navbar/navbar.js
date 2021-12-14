import React from "react";
import { Link } from "react-router-dom";
const navbar = () => {
  const authToken = localStorage.getItem("auth_token");
  console.log(authToken);

  return (
    <div>
      <li>
        <Link to="/">Home</Link>
      </li>
      {!authToken && (
        <li>
          <Link to="/register">Register</Link>
        </li>
      )}
      {!authToken && (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}

      {authToken && (
        <li>
          <Link to="/" onClick={logOut}>
            Logout
          </Link>
        </li>
      )}
    </div>
  );
};

function logOut() {
  localStorage.removeItem("auth_token");
  this.render();
}
export default navbar;
