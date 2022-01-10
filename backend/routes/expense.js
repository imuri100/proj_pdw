const express = require("express");
const expenseController = require("../controllers/expenseController");
const authController = require("../controllers/authController");
const UploadUser = require("../models/UploadImage");

const router = express.Router();

router.post(
  "/expense",
  authController.protectRoute,
  expenseController.createExpense
);
router.get(
  "/expenses",
  authController.protectRoute,
  expenseController.getUserExpenses
);

router.get(
  "/expensesByCategoria",
  authController.protectRoute,
  expenseController.getExpensesByCategoria
);

router.get(
  "/expensesByData",
  authController.protectRoute,
  expenseController.getExpensesByData
);


router.post(
  "/Importexpenses",
  authController.protectRoute,
  expenseController.ImportExpense
);

router.patch(
  "/expenses",
  UploadUser.single('image'),
  authController.protectRoute,
  expenseController.UploadImage
);


router.post(
  "/ExportExpenses",
  authController.protectRoute,
  expenseController.exportToExcel
);
module.exports = router;
