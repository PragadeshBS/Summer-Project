const { login } = require("../controllers/authController");

const router = require("express").Router();

router.post("/", login);

module.exports = router;
