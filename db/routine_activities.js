const client = require("./client");

async function getRoutineActivityById(id) {
  const {
    rows: [routineActivity],
  } = await client.query(
    `SELECT *
    FROM routine_activities
    WHERE id=$1;`,
    [id]
  );
  return routineActivity;
}

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
  const {
    rows: [routineActivity],
  } = await client.query(
    `INSERT INTO routine_activities ("routineId", "activityId", count, duration)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [routineId, activityId, count, duration]
  );
  return routineActivity;
}

async function getRoutineActivitiesByRoutine({ id }) {
  const {
    rows: [routineActivity],
  } = await client.query(
    `SELECT *
    FROM routine_activities
    WHERE "routineId"=$1;`,
    [id]
  );
  return routineActivity;
}

async function updateRoutineActivity({ id, ...fields }) {
  const fieldNames = Object.keys(fields);

  const setString = fieldNames
    .map((fieldName, index) => {
      return `${fieldName}=$${index + 2}`;
    })
    .join(", ");

  const fieldValues = Object.values(fields);

  const { rows } = await client.query(
    `UPDATE routine_activities SET ${setString}
    WHERE id=$1
    RETURNING *;
    `,
    [id, ...fieldValues]
  );

  const [routineActivity] = rows;

  return routineActivity;
}

async function destroyRoutineActivity(id) {}

async function canEditRoutineActivity(routineActivityId, userId) {}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
