const ErrorResponse = require("../utils/errorResponse");
const Opportunity = require("../models/Opportunity");
const asyncHandler = require("../middlewares/async");

// @desc get a list of opportunities
// @route GET /api/v1/opportunities
// @access PRIVATE
exports.getOpportunities = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc create an opportunity
// @route POST /api/v1/opportunities
// @access PRIVATE
exports.createOpportunity = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id; // add current user id to body

  let newOpportunity = await Opportunity.create(req.body);

  newOpportunity = await newOpportunity
    .populate([
      {
        path: "user",
        select: "name",
      },
      { path: "activities" },
    ])
    .execPopulate();

  res.status(201).json({ success: true, data: newOpportunity });
});

// @desc edit an opportunity
// @route PUT /api/v1/opportunities/:id
// @access PRIVATE
exports.editOpportunity = asyncHandler(async (req, res, next) => {
  let opportunity = await Opportunity.findById(req.params.id);
  if (!opportunity) {
    return next(
      new ErrorResponse(
        `Opportunity with id of ${req.params.id} does not exist`
      )
    );
  }

  if (
    opportunity.user.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(
      new ErrorResponse(`User with Id ${req.params.id} cannot edit opportunity`)
    );
  }

  opportunity = await Opportunity.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  }).populate([
    {
      path: "user",
      select: "name",
    },
    { path: "activities" },
  ]);
  res.status(200).json({ success: true, data: opportunity });
});

// @desc Get a single opportunity
// @route GET /api/v1/opportunities/:id
// @access PRIVATE
exports.getOpportunity = asyncHandler(async (req, res, next) => {
  let opportunity = await Opportunity.findById(req.params.id).populate([
    {
      path: "user",
      select: "name",
    },
    { path: "activities" },
  ]);

  if (!opportunity) {
    return next(
      new ErrorResponse(`Opportunity with id ${req.params.id} does not exist`)
    );
  }

  if (opportunity.user._id != req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User with id of ${req.user.id} is not authorized to access this resource`
      )
    );
  }

  res.status(200).json({ success: true, data: opportunity });
});

// @desc delete a single opportunity
// @route DELETE /api/v1/opportunities/:id
// @access PRIVATE
exports.deleteOpportunity = asyncHandler(async (req, res, next) => {
  let opportunity = await Opportunity.findById(req.params.id);

  if (!opportunity) {
    return next(
      new ErrorResponse(
        `opportunity with id of ${req.params.id} does not exist`
      )
    );
  }

  if (
    opportunity.user.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(
      new ErrorResponse(
        `User with id of ${req.user.id} is not authorized to delete this resource`
      )
    );
  }

  opportunity.remove();

  res.status(200).json({ success: true, data: [] });
});
