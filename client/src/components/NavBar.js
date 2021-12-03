import React from "react";
import { Link, useHistory } from "react-router-dom";

const NavBar = ({ isLoggedIn, setIsLoggedIn }) => {
  const history = useHistory();
  const handleClick = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    history.push("/");
  };
  return (
    <nav id="navbar">
      <h1 id="title">Riz, Kyle, & Mark's Fitness Tracker!</h1>
      <div id="links">
        <Link className="navLinks" to="/">
          Home
        </Link>
        <Link className="navLinks" to="/routines">
          All Routines
        </Link>
        <Link className="navLinks" to="/activities">
          Activities
        </Link>
        {isLoggedIn ? (
          <>
            <Link className="navLinks" to="/myroutines">
              My Routines
            </Link>
            <Link className="navLinks" to="/" onClick={handleClick}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link className="navLinks" to="/login">
              Login
            </Link>
            <Link className="navLinks" to="/register" className="navLinks">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
