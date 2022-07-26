const {
  login,
  createUser,
  updateUser,
} = require("../controllers/authController");

const router = require("express").Router();

router.post("/signup", createUser);

router.post("/login", login);

router.patch("/user/:id", updateUser);

module.exports = router;
