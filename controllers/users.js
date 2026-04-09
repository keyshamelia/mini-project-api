const UserModel = require("../models/users");

const UserController = {
  getAll: async (req, res) => {
    try {
      const users = await UserModel.findAll();
      res.json({
        code: 200,
        message: "Successfully get users",
        data: users,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id);

      if (!user) {
        return res.status(404).json({ code: 404, message: "User not found" });
      }

      res.json({
        code: 200,
        message: "Successfully get user",
        data: user,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  store: async (req, res) => {
    try {
      const { nama, email, role } = req.body;

      if (!nama || !email) {
        return res.status(400).json({ message: "Field nama dan email wajib diisi" });
      }

      const data = { nama, email, role: role || "buyer" };
      const result = await UserModel.store(data);

      res.json({
        code: 200,
        message: "Successfully store user",
        data: { id: result.insertId, ...data },
      });
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ message: "Email sudah terdaftar" });
      }
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nama, email, role } = req.body;

      if (!nama && !email && !role) {
        return res.status(400).json({ message: "Minimal satu field harus diisi" });
      }

      const oldUser = await UserModel.findById(id);
      if (!oldUser) {
        return res.status(404).json({ code: 404, message: "User not found" });
      }

      const data = {
        nama: nama ? nama : oldUser.nama,
        email: email ? email : oldUser.email,
        role: role ? role : oldUser.role,
      };

      await UserModel.update(id, data);

      res.json({
        code: 200,
        message: "Successfully update user",
        data: { id, ...data },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id);

      if (!user) {
        return res.status(404).json({ code: 404, message: "User not found" });
      }

      await UserModel.destroy(id);
      res.json({ code: 200, message: "Successfully delete user" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // PINDAHIN KE SINI (DI DALEM OBJECT)
  getSellerProductCount: async (req, res) => {
    try {
      const data = await UserModel.findSellerProductCount();
      res.json({
        code: 200,
        message: "Successfully get seller product count",
        data,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = UserController;