require("dotenv").config();

const errorHandler = (err, _req, res, _next) => {
  // kaloo gaada status code
  const statusCode = err.statusCode ? err.statusCode : 500;

  // format harus sesuai instruksi
  const errorResponse = {
    status: "error",
    message: statusCode === 500 ? "internal server error" : err.message,
  };

  if (process.env.MODE === "development") {
    errorResponse.stack = err.stack;
  }

  return res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;