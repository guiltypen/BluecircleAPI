const express = require("express");
const router = express.Router();

//Controllers
const {
  questionCreate,
  questionList,
  questionUpdate,
  questionDelete,
} = require("../questions/questionsController");

// question List
router.get("/", questionList);

// question Delete
router.delete("/:questionId", questionDelete);

// // question Create
// router.post("/", questionCreate);

// question Update
router.put("/:questionId", questionUpdate);

module.exports = router;
