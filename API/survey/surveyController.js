const { Survey, Question } = require("../../db/models/");
const slugify = require("slugify");

exports.fetchSurvey = async (surveyId, next) => {
  try {
    const survey = await Survey.findByPk(surveyId);
    return survey;
  } catch (error) {
    next(error);
  }
};

// Create new survey
exports.surveyCreate = async (req, res) => {
  try {
    const newSurvey = await Survey.create(req.body);
    res.status(201).json(newsurvey);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// survey List
exports.surveyList = async (req, res) => {
  try {
    const surveys = await Survey.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(surveys);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update survey
exports.surveyUpdate = async (req, res) => {
  const { surveyId } = req.params;
  try {
    const foundSurvey = await Survey.findByPk(surveyId);
    if (foundSurvey) {
      await foundSurvey.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "survey not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete survey
exports.surveyDelete = async (req, res) => {
  const { surveyId } = req.params;
  try {
    const foundSurvey = await Survey.findByPk(surveyId);
    if (foundSurvey) {
      await foundSurvey.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Survey not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new question
exports.questionCreate = async (req, res, next) => {
  try {
    req.body.surveyId = req.survey.id;
    const newQuestion = await Question.create(req.body);
    res.status(201).json(newquestion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  next();
};
