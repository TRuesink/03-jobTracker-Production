const ErrorResponse = require("../utils/errorResponse");
const Opportunity = require("../models/Opportunity");
const Meeting = require("../models/Meeting");
const asyncHandler = require("../middlewares/async");

// @desc get a list of meetings
// @route GET /api/v1/opportunities/:oppId/meetings
// @access PRIVATE
exports.getMeetings = asyncHandler(async (req, res, next) => {
  if (req.params.oppId) {
    const meetings = await Meeting.find({
      opportunity: req.params.oppId,
      user: req.user.id,
    }).populate([
      { path: "contact", select: "name" },
      { path: "opportunity", select: "name" },
    ]);
    res.status(200).json({
      success: true,
      count: meetings.length,
      data: meetings,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc create a meetings
// @route POST /api/v1/opportunities/:oppId/meetings
// @access PRIVATE
exports.createMeeting = asyncHandler(async (req, res, next) => {
  req.body.opportunity = req.params.oppId;
  req.body.user = req.user.id;

  const opportunity = await Opportunity.findById(req.params.oppId);

  if (!opportunity) {
    return next(
      new ErrorResponse(`opportunity not found with id of ${req.params.oppId}`)
    );
  }

  if (opportunity.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `user does not own opportunity with id of ${req.params.oppId}`
      )
    );
  }

  let newMeeting = await Meeting.create(req.body);

  newMeeting = await newMeeting
    .populate([
      { path: "contact", select: "name" },
      { path: "opportunity", select: "name" },
    ])
    .execPopulate();

  res.status(201).json({
    success: true,
    data: newMeeting,
  });
});

// @desc get a single meeting
// @route GET /api/v1/meetings/:id
// @access PRIVATE
exports.getMeeting = asyncHandler(async (req, res, next) => {
  const meeting = await Meeting.findById(req.params.id).populate([
    { path: "contact", select: "name" },
    { path: "opportunity", select: "name" },
  ]);

  if (!meeting) {
    return next(
      new ErrorResponse(`meeting with id of ${req.params.id} does not exist`)
    );
  }

  if (meeting.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`user not authorized to access meeting`));
  }

  res.status(200).json({
    success: true,
    data: meeting,
  });
});

// @desc edit a meeting
// @route GET /api/v1/meetings/:id
// @access PRIVATE
exports.editMeeting = asyncHandler(async (req, res, next) => {
  let meeting = await Meeting.findById(req.params.id);

  if (!meeting) {
    return next(
      new ErrorResponse(`meeting with id of ${req.params.id} does not exist`)
    );
  }

  if (meeting.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`user not authorized to access meeting`));
  }

  meeting = await Meeting.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  }).populate([
    { path: "contact", select: "name" },
    { path: "opportunity", select: "name" },
  ]);

  res.status(200).json({
    success: true,
    data: meeting,
  });
});

// @desc delete a meeting
// @route GET /api/v1/meetings/:id
// @access PRIVATE
exports.deleteMeeting = asyncHandler(async (req, res, next) => {
  const meeting = await Meeting.findById(req.params.id);

  if (!meeting) {
    return next(
      new ErrorResponse(`meeting with id of ${req.params.id} does not exist`)
    );
  }

  if (meeting.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`user not authorized to delete meeting`));
  }

  await meeting.remove();

  res.status(200).json({
    success: true,
    data: [],
  });
});
