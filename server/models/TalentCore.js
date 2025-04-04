const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

class TalentCore extends Model { }

TalentCore.init({
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
    buff_att: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
    debuff_att: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
    inflict_att: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
    buff_values: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    debuff_values: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    inflict_values: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    is_primary_core: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    is_secondary_core: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    max_level: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        validate: {
            min: 1,
            max: 10
        }
    },
    extra_prerequisite: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "TalentCore",
    tableName: "talent_cores",
    timestamps: false
});

module.exports = TalentCore;