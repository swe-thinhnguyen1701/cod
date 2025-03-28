const {populateHeroRolesMap} = require("./heroRoleMap");
const {populateRoleTalentCoreMap} = require("./roleTalentCoreMap");

const populateData = async () => {
    await populateHeroRolesMap();
    await populateRoleTalentCoreMap();
};

module.exports = { populateData };