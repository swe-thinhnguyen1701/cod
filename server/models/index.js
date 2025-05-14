const Hero = require("./Hero");
const Artifact = require("./Artifact");
const Role = require("./Role");
const TalentCore = require("./TalentCore");
const Skill = require("./Skill");
const Message = require("./Message");
const Stat = require("./Stat");

Hero.belongsToMany(Role, {
    through: "hero_roles",
    foreignKey: "hero_id",
    otherKey: "role_id",
    onDelete: "CASCADE",
    as: "roles"
});

Role.belongsToMany(Hero, {
    through: "hero_roles",
    foreignKey: "role_id",
    otherKey: "hero_id",
    onDelete: "CASCADE",
    as: "heroes"
});

Role.belongsToMany(TalentCore, {
    through: "role_talent_cores",
    foreignKey: "role_id",
    otherKey: "talent_core_id",
    onDelete: "CASCADE"
});

Stat.belongsToMany(Artifact, {
    through: "artifact_stats",
    foreignKey: "stat_id",
    otherKey: "artifact_id",
    onDelete: "CASCADE",
    as: "artifacts"
});

Artifact.belongsToMany(Stat, {
    through: "artifact_stats",
    foreignKey: "artifact_id",
    otherKey: "stat_id",
    onDelete: "CASCADE",
    as: "stats"
});

module.exports = {Hero, Artifact, Role, TalentCore, Skill, Stat, Message};