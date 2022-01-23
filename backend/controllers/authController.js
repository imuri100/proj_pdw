const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const GlobalError = require("../utils/globalError");
const { promisify } = require("util");
const PasswordReset = require("../models/passwordReset")
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs/dist/bcrypt");

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a5713a916c09e6",
    pass: "dcb39f9587c81c"
  }
});

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });



exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token: token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //check if email and password exist
  if (!email || !password) {
    return next(new GlobalError("Please provide email and password!", 400));
  }
  //check if user exists and password
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.isCorrectPassword(password, user.password))) {
    return next(
      new GlobalError("Please enter a valid email and password!", 401)
    );
  }

  //if all good, send token to client
  const token = signToken(user._id);
  res.status(201).json({
    status: "Success",
    token,
  });
});

exports.protectRoute = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new GlobalError("You are not logged in!", 401));
  }
  //token arrives from headers

  //get the token, and check if exists

  //validate tokens
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //if user still exists
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(
      new GlobalError("User belonging to this token does not exist!", 401)
    );
  }
  if (user.changedPasswordAfter(decoded.iat)) {
    return next(
      new GlobalError("User recently changed token!Please login again"),
      401
    );
  }
  //grant access to the user
  req.user = user;
  return next();
});


exports.forgot = catchAsync(async (req, res, next) => {

   const email = req.body.email;
   const token = Math.random().toString(20).substring(2,12)

   const user = await User.findOne({ email });
   if (!user) {
     return next(
       new GlobalError("Please enter a valid email", 401)
     );
   }
   const passwordReset = new PasswordReset({
     email, 
     token
   });

   await passwordReset.save();

  const url = "http://localhost:8000/reset/${token}";

   var transporter = nodemailer.createTransport({
    service: 'Outlook365',
    auth: {
      user: '',
      pass: ''
    }
   });

   transporter.sendMail({
     from: "domingosfernandes_@hotmail.com",
     to: email,
     subject: "reset your password!",
     html: "Click <a href= ${url} >here</a> "
   })

   res.send({
     message: "check your email"
   })

  res.status(201).json({
    status: "success"
  });
});


exports.Reset = catchAsync(async (req, res, next) => {
    if(req.body.password != req.body.password_Confirm){
      return res.status(400).send({ message: "Passwords do not match"})
    }

    const passwordReset = await PasswordReset.findOne({token: req.body.token});

    const {email} = await passwordReset.toJSON();
    const user = await User.findOne({email});

    if(!user){
      return res.status(404).send({ message: "User not found!"})
    }
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(req.body.password, salt);
    user.Save();

    res.Send({ message: "success"})
});

