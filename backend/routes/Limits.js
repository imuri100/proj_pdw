const express = require("express");
const LimitController = require("../controllers/LimitController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get(
  "/Limits",
  authController.protectRoute,
  LimitController.getLimit
);

router.post(
  "/Limits",
  authController.protectRoute,
  LimitController.createLimit
);

router.put(
  "/Limits", 
  authController.protectRoute,
  LimitController.UpdateLimit
);

module.exports = router;
