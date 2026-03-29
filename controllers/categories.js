const CategoryModel = require("../models/categories");

const CategoryController = {
  getAll: async (req, res) => {
    try {
      const categories = await CategoryModel.findAll();
      res.json({
        code: 200,
        message: "Successfully get categories",
        data: categories,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await CategoryModel.findById(id);

      if (!category) {
        return res.status(404).json({ code: 404, message: "Category not found" });
      }

      res.json({
        code: 200,
        message: "Successfully get category",
        data: category,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  store: async (req, res) => {
    try {
      const { nama, deskripsi } = req.body;

      if (!nama) {
        return res.status(400).json({ message: "Field nama wajib diisi" });
      }

      const data = { nama, deskripsi };
      const result = await CategoryModel.store(data);

      res.json({
        code: 200,
        message: "Successfully store category",
        data: { id: result.insertId, ...data },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nama, deskripsi } = req.body;

      if (!nama && !deskripsi) {
        return res.status(400).json({ message: "Minimal satu field harus diisi" });
      }

      const oldCategory = await CategoryModel.findById(id);
      if (!oldCategory) {
        return res.status(404).json({ code: 404, message: "Category not found" });
      }

      const data = {
        nama: nama ? nama : oldCategory.nama,
        deskripsi: deskripsi ? deskripsi : oldCategory.deskripsi,
      };

      await CategoryModel.update(id, data);

      res.json({
        code: 200,
        message: "Successfully update category",
        data: { id, ...data },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await CategoryModel.findById(id);

      if (!category) {
        return res.status(404).json({ code: 404, message: "Category not found" });
      }

      await CategoryModel.destroy(id);
      res.json({ code: 200, message: "Successfully delete category" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = CategoryController;
