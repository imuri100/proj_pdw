const mongoose = require("mongoose");


const LimitSchema = new mongoose.Schema({
    Owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categoria",
      },

    Value: { 
      type: String, 
      required: [true, "Please give a name to the category"]
    },  
    

});


LimitSchema.set("validateBeforeSave", false);

const Limit = new mongoose.model("Limit", LimitSchema);

module.exports = Limit;