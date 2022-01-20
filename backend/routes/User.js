const express = require("express");
const UserController = require("../controllers/UserController");
const authController = require("../controllers/authController");

const router = express.Router();

router.put("/UpdateUser", 
            authController.protectRoute, 
            UserController.UpdateUser);
module.exports = router;
