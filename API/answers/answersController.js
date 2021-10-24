const { Answer, Question } = require("../db/models");

exports.fetchAnswer = async (answerId, next) => {
  try {
    const answer = await Answer.findByPk(answerId);
    return answer;
  } catch (error) {
    next(error);
  }
};

//answer List
exports.answerList = async (req, res, next) => {
  try {
    const answers = await Answer.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Question,
        // as: "question",
        // attributes: ["question"],
      },
    });

    res.json(answers);
  } catch (error) {
    next(error);
  }
};

//Delete answer
exports.answerDelete = async (req, res, next) => {
  const { answerId } = req.params;
  try {
    await req.answer.destroy(req.body);
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};

//update answer
exports.answerUpdate = async (req, res, next) => {
  try {
    await req.answer.update(req.body);
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};
