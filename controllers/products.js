const ProductModel = require("../models/products");

const ProductController = {
  getAll: async (req, res) => {
    try {
      const products = await ProductModel.findAll();
      res.json({
        code: 200,
        message: "Successfully get products",
        data: products,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // JOIN GET /products-with-category
  getAllWithCategory: async (req, res) => {
    try {
      const products = await ProductModel.findAllWithCategory();
      res.json({
        code: 200,
        message: "Successfully get products with category and seller",
        data: products,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await ProductModel.findById(id);

      if (!product) {
        return res.status(404).json({ code: 404, message: "Product not found" });
      }

      res.json({
        code: 200,
        message: "Successfully get product",
        data: product,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  store: async (req, res) => {
    try {
      const { nama, deskripsi, harga, file_url, category_id, seller_id } = req.body;

      if (!nama || !harga || !seller_id) {
        return res.status(400).json({ message: "Field nama, harga, dan seller_id wajib diisi" });
      }

      const data = { nama, deskripsi, harga, file_url, category_id, seller_id };
      const result = await ProductModel.store(data);

      res.json({
        code: 200,
        message: "Successfully store product",
        data: { id: result.insertId, ...data },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nama, deskripsi, harga, file_url, category_id, seller_id } = req.body;

      if (!nama && !harga) {
        return res.status(400).json({ message: "Minimal field nama atau harga harus diisi" });
      }

      const oldProduct = await ProductModel.findById(id);
      if (!oldProduct) {
        return res.status(404).json({ code: 404, message: "Product not found" });
      }

      const data = {
        nama: nama ? nama : oldProduct.nama,
        deskripsi: deskripsi ? deskripsi : oldProduct.deskripsi,
        harga: harga ? harga : oldProduct.harga,
        file_url: file_url ? file_url : oldProduct.file_url,
        category_id: category_id ? category_id : oldProduct.category_id,
        seller_id: seller_id ? seller_id : oldProduct.seller_id,
      };

      await ProductModel.update(id, data);

      res.json({
        code: 200,
        message: "Successfully update product",
        data: { id, ...data },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await ProductModel.findById(id);

      if (!product) {
        return res.status(404).json({ code: 404, message: "Product not found" });
      }

      await ProductModel.destroy(id);
      res.json({ code: 200, message: "Successfully delete product" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = ProductController;
