const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const GlobalError = require("../utils/globalError");
const PasswordReset = require("../models/passwordReset")
const bcrypt = require("bcryptjs/dist/bcrypt");

exports.UpdateUser = catchAsync(async (req, res, next) => {
    //console.log(req)
    let user = await User.findById(req.user._id);

    if (!user) {
    return next(new GlobalError("User not found for that expense!", 401));
    } else {
        newUser = await User.findByIdAndUpdate(user, req.body);
    }

    console.log(newUser)
      res.status(201).json({
        status: "success",
        data: {
          User: newUser,
        },
      });
});

