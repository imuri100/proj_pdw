const mongoose = require("mongoose");


const CategoriaSchema = new mongoose.Schema({
    _creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    nome: { 
      type: String, 
      required: [true, "Please give a name to the category"]
    },  
    
    subCategoria: [{ 
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "SubCategoria"}],
    
    Limit: {type: mongoose.Schema.Types.ObjectId, 
      ref: "Limit"}
});


CategoriaSchema.set("validateBeforeSave", false);

const Categoria = new mongoose.model("Categoria", CategoriaSchema);

module.exports = Categoria;