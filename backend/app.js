const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth");
const expenseRoute = require("./routes/expense");

const  UserRoute = require("./routes/User");


app.use(cors());
app.use(bodyParser.json());
app.use(authRoute);
app.use(expenseRoute);
app.use(UserRoute);

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = "failed";
  err.statusCode = 404;

  next(err);
});

app.use((err, req, res, next) => {
  err.StatusCode = err.StatusCode || 500;
  err.status = err.status || "error";
  res.status(err.StatusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
