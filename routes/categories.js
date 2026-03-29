const express = require("express");
const router = express.Router();
const categories = require("../controllers/categories");

router.get("/", categories.getAll);
router.get("/:id", categories.getById);
router.post("/", categories.store);
router.put("/:id", categories.update);
router.delete("/:id", categories.destroy);

module.exports = router;
