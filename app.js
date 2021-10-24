const express = require("express");
const cors = require("cors");
const db = require("./db/models");
const bodyParser = require("body-parser");
const passport = require("passport");
const { localStrategy } = require("./middlewares/passport");

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passport.use(localStrategy);

app.use((req, res, next) => {
  console.log("I'm a middleware method");
  next();
});
app.use((err, req, res, next) => {
  console.log("I'm an error handling middleware ", err);
});

//User Routes
const userRoutes = require("./API/user/userRoutes");

app.use(userRoutes);

//SurveyRoutes
const surveyRoutes = require("./API/survey/surveyRoutes");
app.use("/surveys", surveyRoutes);

//QuestionRoutes
const questionRoutes = require("./API/questions/questionsRoutes");
app.use("/questions", questionRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});
const run = async () => {
  try {
    await db.sequelize.sync({});
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
