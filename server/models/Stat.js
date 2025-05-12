const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

class Stat extends Model { }

Stat.init({
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
    initial_value: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    max_value: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: "Stat",
    tableName: "stats",
    timestamps: false,
});

module.exports = Stat;