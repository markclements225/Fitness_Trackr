const express = require("express");
const {
  getAllRoutines,
  createRoutine,
  getRoutineById,
  updateRoutine,
} = require("../db");
const activitiesRouter = require("./activities");
const routinesRouter = express.Router();
const { requireUser } = require("./utils");

// GET /api/routines

routinesRouter.get("/", async (req, res) => {
  const routines = await getAllRoutines();

  res.send({
    routines,
  });
});

// POST /api/routines

routinesRouter.post("/", requireUser, async (req, res, next) => {
  const { creatorId, isPublic, name, goal } = req.body;
  const routineData = { creatorId, isPublic, name, goal };

  try {
    const routine = await createRoutine(routineData);

    if (!routine) {
      next({
        name: "ErrorGettingRoutine",
        message: "ROutine does not exist",
      });
    }
    res.send({ routine });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/routines/:routineId

activitiesRouter.patch("/:routineId", requireUser, async (req, res, next) => {
  const { routineId } = req.params;
  const { isPublic, name, goal } = req.body;

  const updateFields = {};

  if (isPublic) {
    updateFields.isPublic = isPublic;
  }

  if (name) {
    updateFields.name = name;
  }

  if (goal) {
    updateFields.goal = goal;
  }

  try {
    const originalRoutine = await getRoutineById(routineId);

    if (originalRoutine.creatorId === req.user.id) {
      const updatedRoutine = await updateRoutine(routineId, updateFields);
      res.send({ routine: updatedRoutine });
    } else {
      next({
        name: "UnauthorizedUserError",
        message: "You cannot update a routine that is not yours",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// DELETE /api/routines/:routineId

// POST /api/routines/:routineId/activities

module.exports = routinesRouter;
