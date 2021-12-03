import { useEffect, useState } from "react";

const Routines = () => {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    const getAllRoutines = async () => {
      const response = await fetch(
        `http://fitnesstrac-kr.herokuapp.com/api/routines`,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      console.log("ROUTINES:", data);

      setRoutines(data);
    };
    getAllRoutines();
  }, []);

  return (
    <>
      <div className="allRoutines">
        <h1 className="allRoutinesTitle">All Routines</h1>

        {routines.map((routine) => (
          <div className="routineInfo">
            <h2>Routine: {routine.name}</h2>
            <h3>Goal: {routine.goal}</h3>
            <h3>Creator Name: {routine.creatorName}</h3>
            {routine.activities.length ? (
              <>
                <h4>Activities:</h4>
                <ul>
                  {routine.activities.map((activity) => (
                    <>
                      <li>
                        {activity.name}: {activity.description}
                      </li>
                      <li>Number of reps: {activity.count}</li>
                      <li>Duration: {activity.duration}</li>
                      <br />
                    </>
                  ))}
                </ul>
              </>
            ) : (
              <p>Activities: none</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Routines;
