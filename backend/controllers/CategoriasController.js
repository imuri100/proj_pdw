const Expense = require("../models/expense");
const Categoria = require("../models/categoria");
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const GlobalError = require("../utils/globalError");

  exports.getCategoria = catchAsync(async (req, res, next) => {
    let user = await User.findById(req.user._id).populate("category");
    console.log(user)
    if (!user) {
      return next(new GlobalError("User not found for that Category!", 401));
    } else {
        res.status(201).json({
        status: "success",
        data: {
                categorias : user.category,
              },
        });         
    }
  });

  exports.createCategoria = catchAsync(async (req, res, next) => { 
        const {subCategoria, nome} = req.body;
        const _creator = req.user._id;
        const Limit =  0;

        let user = await User.findById(req.user._id).populate("category");
        let InfoCat = user.category             //Informações das Categorias deste User 

        for(let i in InfoCat)              //Verifica se já existe uma categoria com este nome
        {
          if(InfoCat[i].nome == nome)           
          {
              return next(new GlobalError("Category already exists!", 401));    
          }
        }

        if (!user) {                        //Verifica se o utilizador existe 
              return next(new GlobalError("User not found for that Category!", 401));
        }else
        {
              const newCategoria = await Categoria.create({     //Criar a nova categoria na BD
                _creator,
                subCategoria,
                nome,
                Limit
              });

              user.category.push(newCategoria);                 //adicionar a categoria criada ao utilizador
              await user.save();
            
              res.status(201).json({
                status: "success",
                data: {
                  Categoria: newCategoria,
                },
              });
        }
  });

  exports.UpdateCategoria = catchAsync(async (req, res, next) => { 
    const id_ = req.body._id
    let categoria_ = await Categoria.findById(id_)
    let user = await User.findById(req.user._id);

          if (!categoria_) {
              res.status(401).json({
                status: "Insuccess",
                message: "Categoria not found"
              })
          }else
          {
            let newCategoria = await Categoria.findByIdAndUpdate(categoria_, req.body);
            await user.save();
                    
            res.status(201).json({
              status: "success",
              data: {
                Categoria: newCategoria,
              },
            });
            //console.log(newCategoria)
          }                 
  });
  
  exports.DeleteCategorias = catchAsync(async (req, res, next) => {  

    let categoria = await Categoria.findById(req.params.id);
    const id = req.params.id
    console.log(req.user._id)
    
          if (!categoria) {

            res.status(401).json({
              status: "Insuccess",
              message: "Categoria not found"
            })

          } else {

                User.findByIdAndUpdate(req.user._id, {$pull: {category: categoria._id}}, {new: true}, function (err, user) {
                  if (err) { return res.send(err) };
                });                                           //Elimina a categoria do array do User

                await Categoria.findByIdAndDelete(id)         //Elimina a categoria da tabela Categorias

                res.status(201).json({
                  status: "success",
                })
            }   
  });