const express = require("express");

const router = express.Router({ mergeParams: true });

const {
  getNotes,
  createNote,
  getNote,
  editNote,
  deleteNote,
} = require("../controllers/noteController");

//model
const Note = require("../models/Note");

//middlewares
const { protect, permissions } = require("../middlewares/auth");
const advancedResults = require("../middlewares/advancedResults");

router
  .route("/")
  .get(
    protect,
    advancedResults(Note, true, { path: "opportunity", select: "name" }),
    getNotes
  )
  .post(protect, createNote);

router
  .route("/:id")
  .get(protect, getNote)
  .put(protect, editNote)
  .delete(protect, deleteNote);

module.exports = router;
