const express = require("express");
const router = express.Router();

//Controllers
const {
  surveyCreate,
  surveyList,
  surveyUpdate,
  surveyDelete,
  fetchSurvey,
  questionCreate,
} = require("../survey/surveyController");

// param middleware (parameter)
router.param("surveyId", async (req, res, next, surveyId) => {
  // get the survey with id surveyID
  const survey = await fetchSurvey(surveyId, next);
  if (survey) {
    // store it in req
    req.survey = survey;
    next();
  } else {
    // give back response 404 Survey Not Found
    const error = new Error("Survey Not Found.");
    error.status = 404;
    next(error);
  }
});

// survey List
router.get("/", surveyList);

// survey Delete
router.delete("/:surveyId", surveyDelete);

// survey Create
router.post("/", surveyCreate);

// survey Update
router.put("/:surveyId", surveyUpdate);

//Create Question
router.post("/:surveyId/questions", questionCreate);

module.exports = router;
