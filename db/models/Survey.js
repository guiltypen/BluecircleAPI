const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Survey = sequelize.define("Survey", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  });
  SequelizeSlugify.slugifyModel(Survey, {
    source: ["title"],
  });

  return Survey;
};
