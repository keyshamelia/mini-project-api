const express = require("express");
const router = express.Router();
const products = require("../controllers/products");

router.get("/", products.getAll);
router.get("/:id", products.getById);
router.post("/", products.store);
router.put("/:id", products.update);
router.delete("/:id", products.destroy);

module.exports = router;
