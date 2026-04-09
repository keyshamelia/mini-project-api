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

  findAllDetail: async () => {
    const [rows] = await pool.query(`
      SELECT 
        t.id AS transaction_id,
        t.total_harga,
        t.status,
        t.created_at,
        u.nama AS buyer_name,
        u.email AS buyer_email,
        p.nama AS product_name,
        p.harga AS product_price,
        c.nama AS category_name,
        s.nama AS seller_name
      FROM transactions t
      JOIN users u ON t.user_id = u.id
      JOIN products p ON t.product_id = p.id
      JOIN categories c ON p.category_id = c.id
      JOIN users s ON p.seller_id = s.id
    `);
    return rows;
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
