const errorMiddleware = (err, req, res, next) => {
  console.error("❌ Backend Error:");
  console.error(err);

  let statusCode = err.statusCode || 500;

  if (err.name === "ValidationError") {
    statusCode = 400;
  }

  if (err.code === 11000) {
    statusCode = 409;
  }

  res.status(statusCode).json({
    success: false,
    message:
      err.message || "Internal server error",
  });
};

export default errorMiddleware;