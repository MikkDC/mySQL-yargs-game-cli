const sequelize = require("./connection");
const { DataTypes } = require("sequelize");

const Game = sequelize.define("game", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
        }
    },
);

const Developer = sequelize.define("developer", {
    developer: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Not given"
        }
    },
);

const Year = sequelize.define("year", {
    year: {
        type: DataTypes.INTEGER,
        allowNull: true
        }
    },
);

Developer.hasMany(Game);
Game.belongsTo(Developer);

Year.hasMany(Game);
Game.belongsTo(Year);

module.exports = { Game, Developer, Year};