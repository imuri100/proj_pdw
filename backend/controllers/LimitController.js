const Categoria = require("../models/categoria");
const SubCategoria = require("../models/Subcategoria");
const Expense = require("../models/expense");
const Limit = require("../models/Limit");
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const GlobalError = require("../utils/globalError");

exports.createLimit = catchAsync(async (req, res, next) => {  

    let user = await User.findById(req.user._id).populate("category");
    const id_ = req.body._id
    let categoria_ = await Categoria.findById(id_)
    if (!categoria_) {
      res.status(401).json({
        status: "Insuccess",
        message: "Categoria not found"
      })
    }else
    {
          const { Value} = req.body;
          const categoria = req.body._id;
          let Owner = user._id

          const newLimit = await Limit.create({     //Criar o novo Limite na BD
            Owner,
            categoria,
            Value
          });

          categoria_.Limit = newLimit._id;                 
          await categoria_.save();

          res.status(201).json({
            status: "success",
            data: {
              Limit: newLimit,
            },
          });
    }
});

exports.getLimit = catchAsync(async (req, res, next) => {
    let user = await User.findById(req.user._id).populate("category");

    if (!user) {
      return next(new GlobalError("User not found for that Category!", 401));
    } else {
        res.status(201).json({
        status: "success",
        data: {
                Limits : await Limit.find({'Owner' : req.user._id})
              },
        });         
    }
  });

exports.UpdateLimit = catchAsync(async (req, res, next) => { 
    const id_ = req.body.id
    let Limit_ = await Limit.findById(id_)
    let user = await User.findById(req.user._id);

          if (!Limit_) {
              res.status(401).json({
                status: "Insuccess",
                message: "Limit not found"
              })
          }else
          {
            let newLimit = await Limit.findByIdAndUpdate(Limit_, req.body);
            await Limit_.save(newLimit);

            res.status(201).json({
              status: "success",
              data: {
                Limit: newLimit,
              },
            });
          }    
});