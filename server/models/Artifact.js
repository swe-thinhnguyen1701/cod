const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

class Artifact extends Model { }

Artifact.init({
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
    rarity_id: {
        type: DataTypes.SMALLINT,
        allowNull: true
    }
}, {
    sequelize,
    modelName: "Artifact",
    tableName: "artifacts",
    timestamps: false,
});

module.exports = Artifact;