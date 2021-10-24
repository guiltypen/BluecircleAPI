const { Question } = require("../../db/models/");
const slugify = require("slugify");

// // Create new question
// exports.questionCreate = async (req, res) => {
//   try {
//     const newQuestion = await Question.create(req.body);
//     res.status(201).json(newquestion);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// question List
exports.questionList = async (req, res) => {
  try {
    const questions = await Question.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update question
exports.questionUpdate = async (req, res) => {
  const { questionId } = req.params;
  try {
    const foundQuestion = await Question.findByPk(questionId);
    if (foundQuestion) {
      await foundQuestion.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "question not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete question
exports.questionDelete = async (req, res) => {
  const { questionId } = req.params;
  try {
    const foundQuestion = await Question.findByPk(questionId);
    if (foundQuestion) {
      await foundQuestion.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Question not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
