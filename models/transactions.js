const { pool } = require("../config/database");

const TransactionModel = {
  findAll: async () => {
    const [rows] = await pool.query("SELECT * FROM transactions");
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query("SELECT * FROM transactions WHERE id = ?", [id]);
    return rows[0];
  },

  store: async (data) => {
    const [rows] = await pool.query("INSERT INTO transactions SET ?", [data]);
    return rows;
  },

  update: async (id, data) => {
    const [rows] = await pool.query("UPDATE transactions SET ? WHERE id = ?", [data, id]);
    return rows;
  },

  destroy: async (id) => {
    const [rows] = await pool.query("DELETE FROM transactions WHERE id = ?", [id]);
    return rows;
  },
};

module.exports = TransactionModel;
