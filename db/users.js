const client = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

// database functions

// user functions

const createUser = async (user) => {
  const { username, password } = user;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  const {
    rows: [newUser],
  } = await client.query(
    `
    INSERT INTO users(username, password)
    VALUES($1, $2)
    ON CONFLICT (username) DO NOTHING
    RETURNING *;
    `,
    [username, hashedPassword]
  );
  delete newUser.password;
  return newUser;
};

const getUser = async ({ username, password }) => {
  const user = await getUserByUsername(username);
  if (!user) {
    return;
  }
  console.log(user);
  const doPasswordsMatch = await bcrypt.compare(password, user.password);
  if (doPasswordsMatch) {
    delete user.password;
    return user;
  }
  return null;
};

const getUserById = async (id) => {
  const {
    rows: [user],
  } = await client.query(
    `SELECT id, username FROM users
    WHERE id = $1;`,
    [id]
  );
  return user;
};

const getUserByUsername = async (username) => {
  const {
    rows: [user],
  } = await client.query(
    `SELECT * FROM users
    WHERE username = $1`,
    [username]
  );
//test
  return user;
};

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
};
