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

  store: async (data) => {
    const [rows] = await pool.query("INSERT INTO users SET ?", [data]);
    return rows;
  },

  update: async (id, data) => {
    const [rows] = await pool.query("UPDATE users SET ? WHERE id = ?", [data, id]);
    return rows;
  },

  destroy: async (id) => {
    const [rows] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return rows;
  },
};

module.exports = UserModel;
