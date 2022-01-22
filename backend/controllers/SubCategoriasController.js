const Categoria = require("../models/categoria");
const User = require("../models/user");
const SubCategoria = require("../models/Subcategoria");
const catchAsync = require("../utils/catchAsync");
const GlobalError = require("../utils/globalError");

  exports.getSubCategoria = catchAsync(async (req, res, next) => {

      let user = await User.findById(req.user._id).populate("category");
      
      let subCateg = await SubCategoria.find({'_creator' : req.user._id}) 

     if (!user) {
        return next(new GlobalError("User not found for that Category!", 401));
      } else {
          res.status(201).json({
          status: "success",
          data: {
                  Subcategorias : subCateg,
                },
          });         
      }  
  });

  exports.createSubCategoria = catchAsync(async (req, res, next) => { 
   
        const {nome} = req.body;
        const id = req.body.id;
        const categoria = id;
        const _creator = req.user._id

        let categoria_ = await  Categoria.findById(id).populate("subCategoria")
        console.log(categoria_)
        let InfoSubCat = categoria_.subCategoria        //Informações das subcategorias desta categoria
        console.log(InfoSubCat)

        for(let i in InfoSubCat)              //Verifica se já existe uma categoria com este nome
        {
          if(InfoSubCat[i].nome == nome)           
          {
              return next(new GlobalError("SubCategory already exists!", 401));    
          }
        }
       
        let newSubCategoria = await SubCategoria.create({     //Criar a nova SubCategoria na BD
          _creator,
          categoria,
          nome
        });

        categoria_.subCategoria.push(newSubCategoria);        //adicionar a SubCategoria criada a Categoria respetiva
        await categoria_.save();

        res.status(201).json({
          status: "success",
          data: {
            SubCategoria: newSubCategoria,
          },
        });
  });

  exports.UpdateSubCategoria = catchAsync(async (req, res, next) => {
    const id_ = req.body.id
    let newSubCategoria = 0;
    console.log(id_)
    let Subcategoria_ = await SubCategoria.findById(id_)

          if (!Subcategoria_) {
          res.status(401).json({
            status: "Insuccess",
            message: "SubCategoria not found"
          })
          }else
          {
            newSubCategoria = await SubCategoria.findByIdAndUpdate(Subcategoria_, req.body);
            await Subcategoria_.save();
              res.status(201).json({
                status: "success",
                data: {
                  SubCategoria: newSubCategoria,
                },
            });
          }       
  });

  exports.DeleteSubCategorias = catchAsync(async (req, res, next) => {
    const id = req.params.id
    let subCategoria = await SubCategoria.findById(id);
    console.log(subCategoria)

          if (!subCategoria) {
              res.status(401).json({
                status: "Insuccess",
                message: "SubCategoria not found"
              })
            } else {
                let CatId = subCategoria.categoria
                Categoria.findByIdAndUpdate(CatId, {$pull: {subCategoria: subCategoria._id}}, {new: true}, function (err, user) {
                  if (err) { return res.send(err) };
                });                                           //Elimina a subCategoria do array do User

                await SubCategoria.findByIdAndDelete(id)

                res.status(201).json({
                  status: "success",
                })
            }
  });