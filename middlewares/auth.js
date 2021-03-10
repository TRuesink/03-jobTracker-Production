const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("./async");

exports.protect = (req, res, next) => {
  if (!req.user) {
    return next(new ErrorResponse("not authorized", 401));
  }
  next();
};

exports.permissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(`User with id of ${req.user.id} is not authorized`)
      );
    }
    next();
  };
};
