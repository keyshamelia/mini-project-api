const express = require("express");
const router = express.Router();
const categories = require("../controllers/categories");

const validateAuth = require("../middleware/validateAuth"); 

router.get("/", validateAuth.validateToken, categories.getAll);
router.get("/:id", validateAuth.validateToken, categories.getById);
router.post("/", validateAuth.validateToken, categories.store);
router.put("/:id", validateAuth.validateToken, categories.update);
router.delete("/:id", validateAuth.validateToken, categories.destroy);

module.exports = router;