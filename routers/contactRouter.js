const express = require("express");

const router = express.Router({ mergeParams: true });

const meetingRouter = require("./meetingRouter");

const {
  getContacts,
  createContact,
  getContact,
  editContact,
  deleteContact,
} = require("../controllers/contactController");

//model
const Contact = require("../models/Contact");

//redirect
router.use("/:contactId/meetings", meetingRouter);

//middlewares
const { protect, permissions } = require("../middlewares/auth");
const advancedResults = require("../middlewares/advancedResults");

router
  .route("/")
  .get(
    protect,
    advancedResults(
      Contact,
      true,
      { path: "opportunity", select: "name" },
      { path: "activities", select: "description" }
    ),
    getContacts
  )
  .post(protect, createContact);

router
  .route("/:id")
  .get(protect, getContact)
  .put(protect, editContact)
  .delete(protect, deleteContact);

module.exports = router;
