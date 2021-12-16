import React from "react";
import { Link } from "react-router-dom";
import "../header.css";
import AppBar from "@mui/material/AppBar";
const navbar = () => {
  //getting jwt token from localstorage
  const authToken = localStorage.getItem("auth_token");
  console.log(authToken);

  //if token doesn't exist, register and login button are visible but logout is not.
  return (
    <div>
      <AppBar position="sticky" id="box">
        <li>
          <Link to="/" id="homeBtn">
            Home
          </Link>
        </li>

        {!authToken && (
          <li>
            <Link to="/register" id="registerBtn">
              Register
            </Link>
          </li>
        )}
        {!authToken && (
          <li>
            <Link to="/login" id="loginBtn">
              Login
            </Link>
          </li>
        )}

        {authToken && (
          <li>
            <Link to="/" onClick={logOut}>
              Logout
            </Link>
          </li>
        )}
      </AppBar>
    </div>
  );
};
//if user clicks on logout, token is removed from localstorage
function logOut() {
  localStorage.removeItem("auth_token");
  this.render();
}
export default navbar;
