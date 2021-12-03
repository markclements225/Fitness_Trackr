const { getUserById } = require(".");
const client = require("./client");
const { attachActivitiesToRoutines } = require("./activities");

async function getRoutineById(id) {
  const {
    rows: [routine],
  } = await client.query(
    `SELECT *
    FROM routines
    WHERE id=$1`,
    [id]
  );
  return routine;
}

async function getRoutinesWithoutActivities() {
  const { rows } = await client.query(`
  SELECT id, "routineId", duration, count
  FROM routines;`);
  return rows;
}

async function getAllRoutines() {
  const { rows } = await client.query(`
  SELECT routines.*, users.username AS "creatorName"
  FROM routines
  JOIN users ON "creatorId" = users.id`);
  console.log("ROWSSSSSSS:", rows);
  // return rows;
  return attachActivitiesToRoutines(rows);
}

async function getAllRoutinesByUser({ username }) {
  const { rows: routines } = await client.query(
    `
  SELECT routines.*, username
  FROM routines
  JOIN users ON "creatorId" = users.id
  WHERE users.id = ${username}
  `,
    [username]
  );
}

// async function getPublicRoutinesByUser({ username }) {}

// async function getAllPublicRoutines() {}

async function getPublicRoutinesByActivity({ id }) {}

async function createRoutine({ creatorId, isPublic, name, goal }) {
  const {
    rows: [newRoutine],
  } = await client.query(
    `INSERT INTO routines("creatorId", "isPublic", name, goal)
    VALUES($1, $2, $3, $4)
    RETURNING *;`,
    [creatorId, isPublic, name, goal]
  );
  return newRoutine;
}

async function updateRoutine({ id, ...fields }) {
  const fieldNames = Object.keys(fields);

  const setString = fieldNames
    .map((fieldName, index) => {
      return `${fieldName}=$${index + 2}`;
    })
    .join(", ");

  const fieldValues = object.values(fields);

  const { rows } = await client.query(
    `UPDATE routines SET ${setString}
    WHERE id = $1
    RETURNING *;
    `,
    [id, ...fieldValues]
  );

  const [routine] = rows;

  return routine;
}

async function destroyRoutine(id) {}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
