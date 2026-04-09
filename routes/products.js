const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/products');
const { validateToken } = require('../middleware/validateAuth');

// tidak perlu token
router.get('/', ProductController.getAll);
router.get('/with-category', ProductController.getAllWithCategory);
router.get('/:id', ProductController.getById);

// ini perlu token - sesuai guideline
router.post('/', validateToken, ProductController.store);
router.put('/:id', validateToken, ProductController.update);
router.delete('/:id', validateToken, ProductController.destroy);

module.exports = router;