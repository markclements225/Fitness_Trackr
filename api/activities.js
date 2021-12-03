const express = require("express");
const { createActivity, updateActivity, getActivityById } = require("../db");
const activitiesRouter = express.Router();
const { requireUser } = require("./utils");

// GET /api/activities/:activityId/routines

// activitiesRouter.get("/", async(req, res) => {
//     try {
//         const publicRoutinesByActivity = await getPublicRoutinesByActivity
//     }
// })

// GET /api/activities

activitiesRouter.get("/", async (req, res) => {
  const activities = await getAllActivities();

  res.send({
    activities,
  });
});

// POST /api/activities

activitiesRouter.post("/", requireUser, async (req, res, next) => {
  const { name, description } = req.body;
  const activityData = { name, description };

  try {
    const activity = await createActivity(activityData);

    if (!activity) {
      next({
        name: "ErrorGettingActivities",
        message: "Activity does not exist",
      });
    }
    res.send({ activity });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/activities/:activityId

activitiesRouter.patch("/:activityId", requireUser, async (req, res, next) => {
  const { activityId } = req.params;
  const { name, description } = req.body;

  const updateFields = {};

  if (name) {
    updateFields.name = name;
  }

  if (description) {
    updateFields.description = description;
  }

  try {
    if (req.user) {
      const updatedActivity = await updateActivity(activityId, updateFields);
      res.send({ activity: updatedActivity });
    } else {
      next({
        name: "NotLoggedIn",
        message: "Please log in to update an activity",
      });
    }
  } catch ({ name, description }) {
    next({ name, description });
  }
});

module.exports = activitiesRouter;
