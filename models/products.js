const { pool } = require("../config/database");

const ProductModel = {
  findAll: async () => {
    const [rows] = await pool.query("SELECT * FROM products");
    return rows;
  },

  // JOIN query - products dengan info category dan seller
  findAllWithCategory: async () => {
    const [rows] = await pool.query(
      `SELECT products.*, categories.nama AS nama_category, users.nama AS nama_seller
       FROM products
       LEFT JOIN categories ON products.category_id = categories.id
       LEFT JOIN users ON products.seller_id = users.id
       ORDER BY products.created_at DESC`
    );
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
    return rows[0];
  },

  store: async (data) => {
    const [rows] = await pool.query("INSERT INTO products SET ?", [data]);
    return rows;
  },

  update: async (id, data) => {
    const [rows] = await pool.query("UPDATE products SET ? WHERE id = ?", [data, id]);
    return rows;
  },

  destroy: async (id) => {
    const [rows] = await pool.query("DELETE FROM products WHERE id = ?", [id]);
    return rows;
  },
};

module.exports = ProductModel;
