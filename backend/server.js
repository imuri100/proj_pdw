const mongoose = require("mongoose");

const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((con) => {
    console.log("DB connection successful!");
  });

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
