const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/usersController");

const router = express.Router();


router.post("/create", createUser);


router.get("/", getUsers);


router.get("/:id", getUserById);


router.put("/:id", updateUser);


router.delete("/:id", deleteUser);

module.exports = router;
