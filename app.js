require("dotenv").config();
const express = require("express");

const usersRouter = require("./routes/users");
const categoriesRouter = require("./routes/categories");
const productsRouter = require("./routes/products");
const transactionsRouter = require("./routes/transactions");
const authRouter = require("./routes/auth"); 
const appError = require("./utils/appError");

const errorHandler = require("./middleware/errorHandler"); // import error handler

const app = express();
const { testConnection } = require("./config/database");

app.use(express.json());

// routes
app.use("/auth", authRouter);      
app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);
app.use("/products", productsRouter);
app.use("/transactions", transactionsRouter);

// 404 handler — format konsisten dengan errorHandler
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route tidak ditemukan",
  });
});

app.use((req, res, next) => {
  next(new appError('${req.method} ${req.originalUrl} tidak ditemukan', 404));
});

// global error handler
app.use(errorHandler);

const start = async () => {
  await testConnection();
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
};

start();