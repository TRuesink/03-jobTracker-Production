const ErrorResponse = require("../utils/errorResponse");
const Activity = require("../models/Activity");
const Contact = require("../models/Contact");
const Opportunity = require("../models/Opportunity");
const asyncHandler = require("../middlewares/async");

// @desc get a list of activities
// @route GET /api/v1/opportunities/:oppId/activities
// @access PRIVATE
exports.getActivities = asyncHandler(async (req, res, next) => {
  if (req.params.oppId) {
    const activities = await Activity.find({
      opportunity: req.params.oppId,
      user: req.user.id,
    }).populate([
      { path: "opportunity", select: "name" },
      { path: "contact", select: "name" },
    ]);
    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc create an activity
// @route POST /api/v1/opportunities/:oppId/activities
// @access PRIVATE
exports.createActivity = asyncHandler(async (req, res, next) => {
  req.body.opportunity = req.params.oppId;
  req.body.user = req.user.id;

  const opp = await Opportunity.findById(req.params.oppId);

  if (!opp) {
    return next(
      new ErrorResponse(`opportunity not found with id of ${req.params.id}`)
    );
  }

  if (opp.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `user does not own opportunity with id of ${req.params.oppId}`
      )
    );
  }

  if (req.body.contact) {
    const contact = await Contact.findById(req.body.contact);
    if (!contact) {
      return next(
        new ErrorResponse(
          `cannot associate activity with contact because contact does not exist`
        )
      );
    }
    contact.touches += 1;
    await contact.save();
  }

  let newActivity = await Activity.create(req.body);

  newActivity = await newActivity
    .populate([
      { path: "opportunity", select: "name" },
      { path: "contact", select: "name" },
    ])
    .execPopulate();

  res.status(201).json({
    success: true,
    data: newActivity,
  });
});

// @desc get a single Activity
// @route GET /api/v1/activities/:id
// @access PRIVATE
exports.getActivity = asyncHandler(async (req, res, next) => {
  const activity = await Activity.findById(req.params.id).populate([
    { path: "opportunity", select: "name" },
    { path: "contact", select: "name" },
  ]);

  if (!activity) {
    return next(
      new ErrorResponse(`activity with id of ${req.params.id} does not exist`)
    );
  }

  if (activity.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`user not authorized to access activity`));
  }

  res.status(200).json({
    success: true,
    data: activity,
  });
});

// @desc edit an activity
// @route GET /api/v1/activities/:id
// @access PRIVATE
exports.editActivity = asyncHandler(async (req, res, next) => {
  let activity = await Activity.findById(req.params.id);

  if (!activity) {
    return next(
      new ErrorResponse(`activity with id of ${req.params.id} does not exist`)
    );
  }

  if (activity.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`user not authorized to access activity`));
  }

  activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  }).populate([
    { path: "opportunity", select: "name" },
    { path: "contact", select: "name" },
  ]);

  res.status(200).json({
    success: true,
    data: activity,
  });
});

// @desc delete an activity
// @route GET /api/v1/activities/:id
// @access PRIVATE
exports.deleteActivity = asyncHandler(async (req, res, next) => {
  const activity = await Activity.findById(req.params.id);

  if (!activity) {
    return next(
      new ErrorResponse(`activity with id of ${req.params.id} does not exist`)
    );
  }

  if (activity.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`user not authorized to delete activity`));
  }

  await activity.remove();

  res.status(200).json({
    success: true,
    data: [],
  });
});
