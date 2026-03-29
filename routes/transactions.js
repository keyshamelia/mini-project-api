const express = require("express");
const router = express.Router();
const transactions = require("../controllers/transactions");

router.get("/", transactions.getAll);
router.get("/:id", transactions.getById);
router.post("/", transactions.store);
router.put("/:id", transactions.update);
router.delete("/:id", transactions.destroy);

module.exports = router;
