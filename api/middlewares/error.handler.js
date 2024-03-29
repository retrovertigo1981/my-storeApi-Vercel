const { ValidationError } = require('sequelize');

function errorHandler(err, req, res, next) {
  res.status(404).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

function ormValitationHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.message,
      errors: err.errors.map((e) => e.message),
    });
  } else {
    next(err);
  }
}

module.exports = { errorHandler, boomErrorHandler, ormValitationHandler };
