const { TalentCore, Role } = require("../models");
const roleTalentCoreData = require("../db/roleTalentCore");
const mainTalentCoreData = require("../db/mainTalentCores");
// 17, and 3 roles
// 0: 1, 2, 3
// role id: []
// 
const MAIN_TALENT_CORE_MAP = new Map();
const ROLE_TALENT_CORE_MAP = new Map();

const populateRoleTalentCoreMap = async () => {
    try {
        for (let i = 0; i < roleTalentCoreData.length; i++) {
            const roleName = roleTalentCoreData[i].name;
            const talentCoreIds = roleTalentCoreData[i].talentCores;
            const role = await Role.findOne({ where: { name: roleName } });

            const array = [];
            for (let j = 0; j < talentCoreIds.length; j++) {
                const talentCore = await TalentCore.findByPk(talentCoreIds[j]);
                array.push(talentCore.dataValues);
            }
            ROLE_TALENT_CORE_MAP.set(role.id, array);
        }

        for (let i = 0; i < mainTalentCoreData.length; i++) {
            const mainRole = await Role.findOne({ where: { name: mainTalentCoreData[i].name } });
            const mainTalentCore = await TalentCore.findByPk(mainTalentCoreData[i].talentCoreId);
            const array = [];
            array.push(mainTalentCore.dataValues);
            MAIN_TALENT_CORE_MAP.set(mainRole.id, array);
        }

    } catch (error) {
        console.error("Error populating role-talent core map:", error);
    }
}

// const test = async() => {
//     await populateRoleTalentCoreMap();
//     console.log(ROLE_TALENT_CORE_MAP.get(3));
// }

// test();

module.exports = { ROLE_TALENT_CORE_MAP, MAIN_TALENT_CORE_MAP, populateRoleTalentCoreMap };