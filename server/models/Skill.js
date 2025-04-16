const sequelize = require("../config/connection");
const {Model, DataTypes} = require("sequelize");

class Skill extends Model { }

Skill.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 30]
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    isRage: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    isUltimate: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    hero_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "heroes",
            key: "id"
        },
        onDelete: "CASCADE"
    }
}, {
    sequelize,
    modelName: "Skill",
    tableName: "skills",
    timestamps: false
});

module.exports = Skill;