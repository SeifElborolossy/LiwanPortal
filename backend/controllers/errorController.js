const AppError = require("../utils/AppError");

const sendErrorDev = (err, req, res) => {
  //A)API
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  //B)Rendered Website
  return res.status(err.statusCode).json({
    status: "Failed",
    msg: "something went wrong",
  });
};

const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    //B) Programming or other unknown error: don't leak error details
    console.error("ERROR 💥", err);

    return res.status(err.statusCode).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }

  //A) Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).render("error", {
      title: "Something went wrong!",
      msg: err.message,
    });
  }
  //B) Programming or other unknown error: don't leak error details
  // 1) Log error
  console.error("ERROR 💥", err);

  // 2) Send generic message
  return res.status(err.statusCode).render("error", {
    title: "Something went wrong!",
    msg: "Please try again later!",
  });
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error = { ...err };
  error.message = err.message; // Copy the message explicitly
  error.name = err.name; // Copy the name explicitly
  error.status = err.status;
  error.stack = err.stack; // Preserve the stack trace if needed

  sendErrorDev(error, req, res);
};
