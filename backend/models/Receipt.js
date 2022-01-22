const mongoose = require("mongoose");


const ReceiptSchema = new mongoose.Schema({
    Owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    ExpenseID: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: [true, "Please give a name to the category"],
      ref: "Expense"
    }, 

    nome: { 
      type: String, 
      required: [true, "Please give a name to the category"]
    },  
    

});


ReceiptSchema.set("validateBeforeSave", false);

const Receipt = new mongoose.model("Receipt", ReceiptSchema);

module.exports = Receipt;