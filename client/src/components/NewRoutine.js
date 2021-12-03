import { useHistory } from "react-router";
import React, { useState } from "react";

const NewRoutine = ({ isLoggedIn }) => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const TOKEN = window.localStorage.getItem("token");
    const response = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/routines`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          name,
          goal,
          isPublic,
        }),
      }
    );
    const data = await response.json();

    if (data.error) {
      setErrorMessage("Routine name/goal already exists. Please try again.");
    } else if (data.id) {
      history.push("/myroutines");
      setErrorMessage("");
    }
  };

  return (
    <>
      <div className="createRoutinePage">
        {errorMessage ? <p>{errorMessage}</p> : null}
        {isLoggedIn ? (
          <>
            <h2>Create your new routine!</h2>
            <form className="createPostForm" onSubmit={handleSubmit}>
              <label>
                Routine Name:
                <br />
                <input
                  type="text"
                  required
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <br />
              <label>
                Goal:
                <br />
                <input
                  type="text"
                  required
                  name="goal"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                />
              </label>
              <br />
              <label>Is public?</label>
              <br />
              <input
                id="isPublic"
                type="checkbox"
                checked={isPublic}
                name="ispublic"
                onChange={() => setIsPublic(!isPublic)}
              ></input>
              <br />
              <input type="submit" value="Create Routine" />
            </form>
          </>
        ) : (
          <h1>Please log in to create a new routine.</h1>
        )}
      </div>
    </>
  );
};

export default NewRoutine;
