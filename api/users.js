const express = require("express");
const { getUserByUsername } = require("../db");
const usersRouter = express.Router();

// POST /api/users/login

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    const user = await getUserByUsername(username);

    if (user && user.password == password) {
      const token = jwt.sign(
        {
          id: user.id,
          user: username,
        },
        process.env.JWT_SECRET
      );
      res.send({ message: "you're logged in!", token: token });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// POST /api/users/register
usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await getUserByUsername(username);

    if (user) {
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    } else if (password.length < 8) {
      next({
        name: "PasswordLengthError",
        message: "Password must be at least 6 characters",
      });
    }

    const user = await createUser({
      username,
      password,
    });

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.send({
      user,
      message: "Thank you for signing up",
      token,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/users/me

// GET /api/users/:username/routines

usersRouter.get("/:username", async (req, res, next) => {
  const { username } = req.params;

  try {
    const userRoutines = await getAllRoutinesByUser(username);

    res.send({
      routines: userRoutines,
    });
  } catch ({ username }) {
    next({ username });
  }
});

module.exports = usersRouter;
