const sequelize = require("../connection");
const { DataTypes } = require("sequelize");

const Game = sequelize.define("game", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

const Developer = sequelize.define("developer", {
  developer: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

Game.belongsTo(Developer, { constraints: false });
Developer.hasMany(Game, { constraints: false });

module.exports = { Game, Developer };
