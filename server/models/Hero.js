const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

class Hero extends Model { }

Hero.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 50]
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 50]
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    rarity_id: {
        type: DataTypes.SMALLINT,
        allowNull: true
    }
}, {
    sequelize,
    modelName: "Hero",
    tableName: "heroes",
    timestamps: false
});

module.exports = Hero;