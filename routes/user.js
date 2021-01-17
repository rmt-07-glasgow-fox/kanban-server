const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController.js");

router.post("/register", UserController.userRegister);
router.post("/login", UserController.userLogin);
router.post('/googleLogin', UserController.loginGoogle)

module.exports = router;
