const { login, createUser } = require("../controllers/authController");

const router = require("express").Router();

router.post("/signup", createUser);

router.post("/login", login);

module.exports = router;
