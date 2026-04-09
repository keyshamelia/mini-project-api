const express = require("express");
const router = express.Router();
const users = require("../controllers/users");

router.get("/", users.getAll);
router.get("/seller-product-count", users.getSellerProductCount);
router.get("/:id", users.getById);
router.post("/", users.store);
router.put("/:id", users.update);
router.delete("/:id", users.destroy);

module.exports = router;
  