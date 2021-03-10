const ErrorResponse = require("../utils/errorResponse");
const Script = require("../models/Script");
const asyncHandler = require("../middlewares/async");

// @desc get a list of scripts
// @route GET /api/v1/scripts
// @access PRIVATE
exports.getScripts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc create a script
// @route POST /api/v1/scripts
// @access PRIVATE
exports.createScript = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id; // add current user id to body

  let newScript = await Script.create(req.body);

  newScript = await newScript
    .populate({ path: "activities", select: "description" })
    .execPopulate();

  res.status(201).json({ success: true, data: newScript });
});

// @desc get a single script
// @route GET /api/v1/script/:id
// @access PRIVATE
exports.getScript = asyncHandler(async (req, res, next) => {
  let script = await Script.findById(req.params.id).populate({
    path: "activities",
    select: "description",
  });

  if (!script) {
    return next(
      new ErrorResponse(`Script with id ${req.params.id} does not exist`)
    );
  }

  if (script.user._id != req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User with id of ${req.user.id} is not authorized to access this resource`
      )
    );
  }

  res.status(200).json({ success: true, data: script });
});

// @desc edit a script
// @route PUT /api/v1/scripts/:id
// @access PRIVATE
exports.editScript = asyncHandler(async (req, res, next) => {
  let script = await Script.findById(req.params.id);
  if (!script) {
    return next(
      new ErrorResponse(`Script with id of ${req.params.id} does not exist`)
    );
  }

  if (script.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(`User with Id ${req.params.id} cannot edit script`)
    );
  }

  script = await Script.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  }).populate({ path: "activities", select: "description" });
  res.status(200).json({ success: true, data: script });
});

// @desc delete a script
// @route DELETE /api/v1/scripts
// @access PRIVATE
exports.deleteScript = asyncHandler(async (req, res, next) => {
  let script = await Script.findById(req.params.id);

  if (!script) {
    return next(
      new ErrorResponse(`script with id of ${req.params.id} does not exist`)
    );
  }

  if (script.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User with id of ${req.user.id} is not authorized to delete this resource`
      )
    );
  }

  script.remove();

  res.status(200).json({ success: true, data: [] });
});
