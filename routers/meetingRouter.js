const express = require("express");

const router = express.Router({ mergeParams: true });

const {
  getMeetings,
  createMeeting,
  getMeeting,
  editMeeting,
  deleteMeeting,
} = require("../controllers/meetingController");

//model
const Meeting = require("../models/Meeting");

//middlewares
const { protect, permissions } = require("../middlewares/auth");
const advancedResults = require("../middlewares/advancedResults");

router
  .route("/")
  .get(
    protect,
    advancedResults(
      Meeting,
      true,
      { path: "contact", select: "name" },
      { path: "opportunity", select: "name" }
    ),
    getMeetings
  )
  .post(protect, createMeeting);

router
  .route("/:id")
  .get(protect, getMeeting)
  .put(protect, editMeeting)
  .delete(protect, deleteMeeting);

module.exports = router;
