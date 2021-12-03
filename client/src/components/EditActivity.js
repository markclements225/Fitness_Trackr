import { useState } from "react";
import { useHistory } from "react-router";

const EditActivity = ({ routineActivityId }) => {
  const history = useHistory();
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const TOKEN = window.localStorage.getItem("token");

    const response = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/routine_activities/${routineActivityId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          count,
          duration,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    history.push("/myroutines");
  };

  console.log("ROUTINEACTIVITYID:", routineActivityId);
  return (
    <>
      <div className="editActivity">
        <h2>Edit your Activity</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Updated count:
            <br />
            <input
              type="text"
              required
              name="count"
              defaultValue={count}
              value={count}
              onChange={(e) => setCount(e.target.value)}
            />
          </label>
          <br />
          <label>
            Updated duration:
            <br />
            <input
              type="text"
              required
              name="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </label>
          <br />
          <input type="submit" value="Edit Activity" />
        </form>
      </div>
    </>
  );
};

export default EditActivity;
