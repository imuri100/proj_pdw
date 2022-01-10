const Categoria = require("../models/categoria");
const SubCategoria = require("../models/Subcategoria");
const Expense = require("../models/expense");
const Receipt = require("../models/Receipt");
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const GlobalError = require("../utils/globalError");
const excelJS = require("exceljs");
const XLSX = require('xlsx');

exports.createExpense = catchAsync(async (req, res, next) => {
  const { expense, value, date } = req.body;
  const category_ = req.body.category
  const Subcategory_ = req.body.Subcategory
  const _creator = req.user._id;
  const Receipt = null;

  let cat = await Categoria.findById(category_)            
  let Subcat = await SubCategoria.findById(Subcategory_)

  if (!cat) {
    return next(new GlobalError("Category not found!", 401));
  }

  if (!Subcat) {
    return next(new GlobalError("SubCategory not found!", 401));
  }

 
  const category = cat.nome
  const Subcategory = Subcat.nome
  let user = await User.findById(req.user._id);
  
  if (!user) {
    return next(new GlobalError("User not found for that expense!", 401));
  } else {
    const newExpense = await Expense.create({
      Receipt,
      _creator,
      expense,
      value,
      category,
      Subcategory,
      date,
    });
    //console.log(newExpense);
    user.expenses.push(newExpense);
    // console.log(user.expenses);
    await user.save();
    console.log(user)
    res.status(201).json({
      status: "success",
      data: {
        expense: newExpense,
      },
    });
  }
});

exports.getUserExpenses = catchAsync(async (req, res, next) => {
  let user = await User.findById(req.user._id).populate("expenses");
  console.log(user)
  if (!user) {
    return next(new GlobalError("User not found for that expense!", 401));
  } else {
    res.status(201).json({
      status: "success",
      data: {
        expenses: user.expenses,
      },
    });
  }
});

exports.ImportExpense = catchAsync(async (req, res, next) => {
  const _creator = req.user._id;
  const {date} = req.body;
  const Receipt = null;
 

      const wB = XLSX.readFile('./Despesas.xlsx', {cellDates:true})
      const wS = wB.Sheets["Folha1"];
      var data = XLSX.utils.sheet_to_json(wS);
      lenght= Object.keys(data).length;
      let user = await User.findById(req.user._id);
      //rows.shift();           //Elimina o header da tabela
      try
      {
        for(i=0;i<lenght;i++)
        {
          const expense = data[i].Expense;
          const value = data[i].Value;
          const category = data[i].Category;
          const Subcategory = data[i].SubCategory;
          
          const newExpense =  await Expense.create({
            Receipt,
            _creator,
            expense,
            value,
            category,
            Subcategory,
            date,
          })

          user.expenses.push(newExpense);
          await user.save();
        }
        res.send({
          status: "success",
            message: "file successfully Imported",
          });
      }catch(err)
      {
        res.send({
          status: "error",
          message: "Something went wrong",
        });
      }
      
      
});

exports.UploadImage = catchAsync(async (req, res, next) => { 
  //console.log(req)
  const ExpenseID = req.body.id;           //Id da Expense
  const Owner = req.user._id               //Id do User
  const nome = req.file.originalname       //nome do ficheiro
  let Expense_ = await  Expense.findById(ExpenseID)

  if(req.file)                                            //Se o ficheiro é transferido corretamente
  {
      const newReceipt = await Receipt.create({         //Cria novo recibo com o Id da despesa, do dono e o nome do ficheiro
          ExpenseID,
          Owner,
          nome
      });
      Expense_.Receipt = newReceipt;                  //Associa este novo recibo criado a despesa em questão
      await Expense_.save();                  

      return res.json({                               //upload feito
        erro: true,
        mensagem: "upload realizado com sucesso!"
      })
  }
  
  return res.json({                                   //erro
    erro: false,
    mensagem: "upload nao realizado com sucesso!"
  })
  
});

exports.exportToExcel = catchAsync(async (req, res, next) => {
      const workbook = new excelJS.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("Folha1"); // New Worksheet
      const path = "./tmp";  // Path to download excel

      let UserExp = await User.findById(req.user._id).populate("expenses")
      let Expense_ = UserExp.expenses
      console.log(Expense_)

      // Column for data in excel. key must match data key
      worksheet.columns = [
        { header: "Expense", key: "expense", width: 10 }, 
        { header: "Value", key: "value", width: 10 },
        { header: "Category", key: "category", width: 10 },
        { header: "SubCategory", key: "Subcategory", width: 10 },
    ];

    // Making first line in excel bold
    worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
    });
    try {

        Expense_.forEach(expense_ =>{
              worksheet.addRow(expense_);;                      //escreve os dados no excel
        })

        const data = await workbook.xlsx.writeFile(`${path}/BaseDadosExportada.xlsx`)         //cria o excel
        .then(() => {
          res.send({
            status: "success",
            message: "file successfully downloaded",
            path: `${path}/BaseDados.xlsx`,
            });
        });
    } catch (err) {

        res.send({
          status: "error",
          message: "Something went wrong",
        });
      }
});

exports.getExpensesByCategoria = catchAsync(async (req, res, next) => {
  const CatID = req.body.id
  let Categoria_ = await Categoria.findById(CatID)
  const nome_ = Categoria_.nome
  console.log(nome_)
  let user = await User.findById(req.user._id).populate("expenses");

  if (!user) {
    return next(new GlobalError("User not found for that expense!", 401));
  } else {

    res.status(201).json({
      status: "success",
      data: {
        expenses: user.expenses.filter(x => x.category==nome_),
      },
    });
  }
});

exports.getExpensesByData = catchAsync(async (req, res, next) => {
  const DataInicio = req.body.Data_inicio
  const DataFim = req.body.Data_fim
  
  const DI = new Date(DataInicio)
  const DF = new Date(DataFim)
  
  let user = await User.findById(req.user._id).populate("expenses");

  if (!user) {
    return next(new GlobalError("User not found for that expense!", 401));
  } else {

    res.status(201).json({
      status: "success",
      data: {
        expenses: user.expenses.filter(x => x.createdAt<DF && x.createdAt>DI),
      },
    });
  }
});