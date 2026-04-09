const { pool } = require("../config/database");

const UserModel = {
  findAll: async () => {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  },

  findByEmail: async (email) => {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
  },

  // tambah setelah findByEmail
findSellerProductCount: async () => {
  const [rows] = await pool.query(`
    SELECT 
      u.id AS seller_id,
      u.nama AS seller_name,
      COUNT(p.id) AS total_products
    FROM users u
    LEFT JOIN products p ON u.id = p.seller_id
    WHERE u.role = 'seller'
    GROUP BY u.id, u.nama
  `);
  return rows;
},

  store: async (data) => {
    const [rows] = await pool.query("INSERT INTO users SET ?", [data]);
    return rows;
  },

  update: async (id, data) => {
    const [rows] = await pool.query("UPDATE users SET ? WHERE id = ?", [data, id]);
    return rows;
  },

  updatePassword: async (password, id) => {
    const [rows] = await pool.query("UPDATE users SET password = ? WHERE id = ?", [password, id]);
    return rows;
  },

  destroy: async (id) => {
    const [rows] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return rows;
  },
};

module.exports = UserModel;