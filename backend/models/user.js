const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    length: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (element) {
        return element === this.password;
      },
    },
  },

  expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense" }],
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Categoria" }],

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  passwordChangedAt: Date,
});

userSchema.set("validateBeforeSave", false);

//before saving check if password has been modified
userSchema.pre("save", async function (next) {
  //only run this function if password has been modified
  if (!this.isModified("password")) return next();

  //need to use .hash async to not block the event loop.
  this.password = await bcrypt.hash(this.password, 12);

  //no need to save passwordConfirm to the db, so we can set undefined
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.isCorrectPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTIssuedTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(JWTIssuedTimestamp, changedTimestamp);
    return JWTIssuedTimestamp < changedTimestamp;
  }
  return false;
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
