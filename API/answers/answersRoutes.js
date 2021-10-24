const express = require("express");
const router = express.Router();

//Controllers
const {
  answerCreate,
  answerList,
  answerUpdate,
  answerDelete,
} = require("../answers/answersController");

// answer List
router.get("/", answerList);

// answer Delete
router.delete("/:answerId", answerDelete);

// answer Create
router.post("/", answerCreate);

// answer Update
router.put("/:answerId", answerUpdate);

module.exports = router;
