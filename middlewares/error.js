const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  console.log(err.stack);

  error.message = err.message;

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "server error",
  });
};

module.exports = errorHandler;
