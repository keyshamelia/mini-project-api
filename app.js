const express = require("express");
const usersRouter = require("./routes/users");
const categoriesRouter = require("./routes/categories");
const productsRouter = require("./routes/products");
const transactionsRouter = require("./routes/transactions");

const app = express();
const { testConnection } = require("./config/database");

app.use(express.json());

app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);
app.use("/products", productsRouter);

// JOIN endpoint - products dengan category dan seller
const products = require("./controllers/products");
app.get("/products-with-category", products.getAllWithCategory);
app.use("/transactions", transactionsRouter);

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    code: 404,
    message: "Route tidak ditemukan",
  });
});

// Handle 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    code: 500,
    message: "Internal server error",
    error: err.message,
  });
});

const start = async () => {
  await testConnection();
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
};

start();
