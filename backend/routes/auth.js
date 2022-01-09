const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.put("/forgot", authController.forgot)
router.put("/Reset", authController.Reset)
module.exports = router;
