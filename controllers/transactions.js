const TransactionModel = require("../models/transactions");

const TransactionController = {
  getAll: async (req, res) => {
    try {
      const transactions = await TransactionModel.findAll();
      res.json({
        code: 200,
        message: "Successfully get transactions",
        data: transactions,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const transaction = await TransactionModel.findById(id);

      if (!transaction) {
        return res.status(404).json({ code: 404, message: "Transaction not found" });
      }

      res.json({
        code: 200,
        message: "Successfully get transaction",
        data: transaction,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  store: async (req, res) => {
    try {
      const { user_id, product_id, total_harga, status } = req.body;

      if (!user_id || !product_id || !total_harga) {
        return res.status(400).json({ message: "Field user_id, product_id, dan total_harga wajib diisi" });
      }

      const data = { user_id, product_id, total_harga, status: status || "pending" };
      const result = await TransactionModel.store(data);

      res.json({
        code: 200,
        message: "Successfully store transaction",
        data: { id: result.insertId, ...data },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { user_id, product_id, total_harga, status } = req.body;

      if (!user_id && !product_id && !total_harga && !status) {
        return res.status(400).json({ message: "Minimal satu field harus diisi" });
      }

      const oldTransaction = await TransactionModel.findById(id);
      if (!oldTransaction) {
        return res.status(404).json({ code: 404, message: "Transaction not found" });
      }

      const data = {
        user_id: user_id ? user_id : oldTransaction.user_id,
        product_id: product_id ? product_id : oldTransaction.product_id,
        total_harga: total_harga ? total_harga : oldTransaction.total_harga,
        status: status ? status : oldTransaction.status,
      };

      await TransactionModel.update(id, data);

      res.json({
        code: 200,
        message: "Successfully update transaction",
        data: { id, ...data },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const transaction = await TransactionModel.findById(id);

      if (!transaction) {
        return res.status(404).json({ code: 404, message: "Transaction not found" });
      }

      await TransactionModel.destroy(id);
      res.json({ code: 200, message: "Successfully delete transaction" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = TransactionController;
