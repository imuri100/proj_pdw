const mongoose = require("mongoose");


const SubCategoriaSchema = new mongoose.Schema({
  
    _creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    
    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoria",
    },

    nome: { 
      type: String, 
      required: [true, "Please give a name to the category"]
    },  
    
});


SubCategoriaSchema.set("validateBeforeSave", false);

const SubCategoria = new mongoose.model("SubCategoria", SubCategoriaSchema);

module.exports = SubCategoria;