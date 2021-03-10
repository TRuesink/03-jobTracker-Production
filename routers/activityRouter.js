const express = require("express");

const router = express.Router({ mergeParams: true });

const {
  getActivities,
  createActivity,
  getActivity,
  editActivity,
  deleteActivity,
} = require("../controllers/activityController");

//model
const Activity = require("../models/Activity");

//middlewares
const { protect, permissions } = require("../middlewares/auth");
const advancedResults = require("../middlewares/advancedResults");

router
  .route("/")
  .get(
    protect,
    advancedResults(
      Activity,
      true,
      { path: "opportunity", select: "name" },
      { path: "contact", select: "name" }
    ),
    getActivities
  )
  .post(protect, createActivity);

router
  .route("/:id")
  .get(protect, getActivity)
  .put(protect, editActivity)
  .delete(protect, deleteActivity);

module.exports = router;
