import React from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="homepage">
        <h1 className="hometitle">Let's get fit!</h1>
        <h3 className="hometitle">Burning off those Thanksgiving calories!</h3>
        <Link to="/routines">
          <div className="buttondiv">
            <button className="thirsty">Let's twerk.</button>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Home;
