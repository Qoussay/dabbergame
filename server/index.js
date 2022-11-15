const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//get the url of the mongo database
const mongo_url = "mongodb://localhost:27017/dabbergame";

//connect to the database through mongoose.connect
mongoose
  .connect(mongo_url, { useNewUrlParser: true })
  .then(
    () => {
      console.log(`Connected to the database: ${mongo_url}`);
    },
    { undefined: true }
  )
  .catch((err) => {
    console.log("Error connecting to the database.");
    console.log(err);
    console.log("Terminating the application now...");
    process.exit();
  });

const gameFetchRoute = require("./routes/gameFetchRoute");
const signupRoute = require("./routes/signupRoute");
const signinRoute = require("./routes/signinRoute");
const userRoute = require("./routes/userRoute");

app.use("/api/games", gameFetchRoute);
app.use("/api/signup", signupRoute);
app.use("/api/signin", signinRoute);
app.use("/api/user", userRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
