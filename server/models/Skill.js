const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

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
    additional_effect: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    upgrade_preview: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    cooldown: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rage_cost: {
        type: DataTypes.SMALLINT,
        allowNull: true
    },
    skill_image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    source_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    source_type: {
        type: DataTypes.ENUM("hero", "artifact", "pet"),
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Skill",
    tableName: "skills",
    timestamps: false,
    indexes: [
        { fields: ["source_id", "source_type"] }
    ]
});

module.exports = Skill;