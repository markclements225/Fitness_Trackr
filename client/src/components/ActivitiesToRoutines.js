import { useState, useEffect } from "react";
import { useHistory } from "react-router";

const ActivitiesToRoutines = ({ routineId }) => {
  const [activities, setActivities] = useState([]);
  const [activityId, setActivityId] = useState([]);
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");
  const history = useHistory();

  useEffect(() => {
    const getAllActivities = async () => {
      const response = await fetch(
        `http://fitnesstrac-kr.herokuapp.com/api/activities`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setActivities(data);
    };
    getAllActivities();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const TOKEN = window.localStorage.getItem("token");

    const response = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}/activities
        `,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          activityId,
          count,
          duration,
        }),
      }
    );
    const data = await response.json();
    console.log(activityId);
    history.push("/myroutines");
  };

  return (
    <>
      <div className="addActivity">
        <h1>Let's attach activities to your routine</h1>

        <form onSubmit={handleSubmit}>
          <h3>Select an activity:</h3>
          <select
            value={activities}
            onChange={(e) => setActivityId(e.target.value)}
          >
            {activities.map((activity) => (
              <option value={activity.id}>{activity.name}</option>
            ))}
          </select>
          <br />
          <br />
          <label>
            Number of Reps:
            <br />
            <input
              type="text"
              required
              name="count"
              value={count}
              placeholder="set desired count"
              onChange={(e) => setCount(e.target.value)}
            />
          </label>
          <br />
          <label>
            Duration:
            <br />
            <input
              type="text"
              required
              name="duration"
              value={duration}
              placeholder="set desired duration"
              onChange={(e) => setDuration(e.target.value)}
            />
          </label>
          <br />
          {/* <button type="submit">Add Activity</button> */}
          <input type="submit" value="Add Activity" />
        </form>
      </div>
    </>
  );
};

export default ActivitiesToRoutines;
