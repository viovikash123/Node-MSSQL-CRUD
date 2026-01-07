const { getPool } = require("../config/db");


const createUser = async (req, res) => {
  try {
    const { name, email } = req.body || {};
    if (!name || !email) {
      return res.status(400).json({ success: false, message: "Name and Email required" });
    }

    const pool = getPool();
    await pool.request()
      .input("name", name)
      .input("email", email)
      .query("INSERT INTO users (name, email) VALUES (@name, @email)");

    res.status(201).json({ success: true, message: "User created successfully" });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


const getUsers = async (req, res) => {
  try {
    const pool = getPool();
    const result = await pool.request().query("SELECT * FROM users");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


const getUserById = async (req, res) => {
  try {
    const pool = getPool();
    const { id } = req.params;
    const result = await pool.request().input("id", id).query("SELECT * FROM users WHERE id = @id");
    if (!result.recordset.length) return res.status(404).json({ success: false, message: "User not found" });
    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


const updateUser = async (req, res) => {
  try {
    const pool = getPool();
    const { id } = req.params;
    const { name, email } = req.body || {};
    if (!name || !email) return res.status(400).json({ success: false, message: "Name and Email required" });

    const result = await pool.request()
      .input("id", id)
      .input("name", name)
      .input("email", email)
      .query("UPDATE users SET name=@name, email=@email WHERE id=@id");

    if (!result.rowsAffected[0]) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


const deleteUser = async (req, res) => {
  try {
    const pool = getPool();
    const { id } = req.params;
    const result = await pool.request().input("id", id).query("DELETE FROM users WHERE id=@id");

    if (!result.rowsAffected[0]) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
