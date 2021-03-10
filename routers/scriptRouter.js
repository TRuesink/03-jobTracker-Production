const express = require("express");
const router = express.Router();

const {
  getScript,
  getScripts,
  createScript,
  editScript,
  deleteScript,
} = require("../controllers/scriptController");

//model
const Script = require("../models/Script");

//middlewares
const { protect, permissions } = require("../middlewares/auth");
const advancedResults = require("../middlewares/advancedResults");

//routes
router
  .route("/")
  .get(
    protect,
    advancedResults(Script, true, {
      path: "activities",
      select: "description",
    }),
    getScripts
  )
  .post(protect, createScript);

router
  .route("/:id")
  .put(protect, editScript)
  .get(protect, getScript)
  .delete(protect, deleteScript);

module.exports = router;
