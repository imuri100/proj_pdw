const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  
  expense: {
    type: String,
    required: [true, "Please give a name to the expense"],
    lowercase: true,
  },
  value: { type: Number, required: [true, "An expense must have a value!"] },
  
  category: {
    type: String,
    unique: false,
    required: [true, "Select a category!"],
  },
  
  Subcategory: {
    type: String,
    unique: false,
    required: [true, "Select a category!"],
  },
  
  Receipt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Receipt"
  },

  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now() },
});

expenseSchema.set("validateBeforeSave", false);

const Expense = new mongoose.model("Expense", expenseSchema);

module.exports = Expense;
