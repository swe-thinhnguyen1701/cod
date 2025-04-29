const Hero = require("./Hero");
const Role = require("./Role");
const TalentCore = require("./TalentCore");
const Skill = require("./Skill");

Hero.belongsToMany(Role, {
    through: "hero_roles",
    foreignKey: "hero_id",
    otherKey: "role_id",
    onDelete: "CASCADE",
    as: "roles"
});

// Hero.belongsToMany(Hero, {
//     as: "Pairings",
//     through: "hero_pairings",
//     foreignKey: "hero_id",
//     otherKey: "paired_hero_id",
//     onDelete: "CASCADE",
// })

Hero.hasMany(Skill, {
    foreignKey: "hero_id",
    onDelete: "CASCADE"
});

Skill.belongsTo(Hero, {
    foreignKey: "hero_id",
    onDelete: "CASCADE"
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

// TalentCore.belongsToMany(Role, {
//     through: "role_talent_cores",
//     foreignKey: "talent_core_id",
//     otherKey: "role_id",
//     onDelete: "CASCADE"
// });

module.exports = {Hero, Role, TalentCore, Skill};