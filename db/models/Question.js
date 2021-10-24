const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define("Question", {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Question;
};
