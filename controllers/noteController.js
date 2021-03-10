const ErrorResponse = require("../utils/errorResponse");
const Note = require("../models/Note");
const Opportunity = require("../models/Opportunity");
const asyncHandler = require("../middlewares/async");

// @desc get a list of notes
// @route GET /api/v1/opportunities/:oppId/notes
// @access PRIVATE
exports.getNotes = asyncHandler(async (req, res, next) => {
  if (req.params.oppId) {
    const notes = await Note.find({
      opportunity: req.params.oppId,
      user: req.user.id,
    }).populate({ path: "opportunity", select: "name" });
    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc create a note
// @route POST /api/v1/opportunities/:oppId/notes
// @access PRIVATE
exports.createNote = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id; // attach user ID to the body
  req.body.opportunity = req.params.oppId; // attach opportunity to note
  const opp = await Opportunity.findById(req.params.oppId);

  if (!opp) {
    return next(
      new ErrorResponse(`there is no opportunity with id of ${req.params.id}`)
    );
  }

  if (opp.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `user does not own opportunity with id of ${req.params.oppId}`
      )
    );
  }

  let newNote = await Note.create(req.body);

  newNote = await newNote
    .populate({ path: "opportunity", select: "name" })
    .execPopulate();

  res.status(201).json({
    success: true,
    data: newNote,
  });
});

// @desc get single note
// @route GET /api/v1/notes/:id
// @access PRIVATE
exports.getNote = asyncHandler(async (req, res, next) => {
  const note = await Note.findById(req.params.id).populate({
    path: "opportunity",
    select: "name",
  });

  if (!note) {
    return next(
      new ErrorResponse(`note with id of ${req.params.id} does not exist`)
    );
  }

  if (note.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`user not authorized to access note`));
  }

  res.status(200).json({
    success: true,
    data: note,
  });
});

// @desc Edit a note
// @route PUT /api/v1/notes/:id
// @access PRIVATE
exports.editNote = asyncHandler(async (req, res, next) => {
  let note = await Note.findById(req.params.id);

  if (!note) {
    return next(
      new ErrorResponse(`note with id of ${req.params.id} does not exist`)
    );
  }
  if (note.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`user not authorized to access note`));
  }

  note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  }).populate({ path: "opportunity", select: "name" });
  res.status(200).json({
    success: true,
    data: note,
  });
});

// @desc Delete a note
// @route DELETE /api/v1/notes/:id
// @access PRIVATE
exports.deleteNote = asyncHandler(async (req, res, next) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return next(
      new ErrorResponse(`note with id of ${req.params.id} does not exist`)
    );
  }
  if (note.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`user not authorized to delete note`));
  }

  await note.remove();

  res.status(200).json({
    success: true,
    data: [],
  });
});
