import { useHistory } from "react-router";
import React, { useState } from "react";

const NewActivity = ({ isLoggedIn }) => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const TOKEN = window.localStorage.getItem("token");
    const response = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/activities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          name,
          description,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.id) {
      history.push("/activities");
    } else {
      setErrorMessage("Oops! Activity already exists!");
    }
  };

  return (
    <>
      <div className="createActivityPage">
        {isLoggedIn ? (
          <>
            <h2>Create New Activity</h2>
            {errorMessage ? <h4>{errorMessage}</h4> : null}
            {successMessage ? <h4>{successMessage}</h4> : null}
            <form className="createPostForm" onSubmit={handleSubmit}>
              <label>
                Activity Name:
                <br />
                <input
                  type="text"
                  required
                  name="name"
                  placeholder="add activity name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <br />
              <label>
                Description:
                <br />
                <input
                  type="text"
                  required
                  name="description"
                  placeholder="add description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
              <br />
              <br />
              <input type="submit" value="Create Activity" />
            </form>
          </>
        ) : (
          <h1>Please log in to create a new activity</h1>
        )}
      </div>
    </>
  );
};

export default NewActivity;
