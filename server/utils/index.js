const s3Client = require("../config/awsConnection");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const fetch = require("node-fetch");
require("dotenv").config();

const { populateHeroRolesMap } = require("./heroRoleMap");
const { populateRoleTalentCoreMap } = require("./roleTalentCoreMap");

const fetchDataHelper = async (fileName) => {
    const command = new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: `${fileName}`
    });
    const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });
    const res = await fetch(url);
    return await res.json();
}

const populateData = async () => {
    try {
        const [heroRoleData, roleCombinationData, roleTalentCoreData, mainTalentCoreData] = await Promise.all([
            fetchDataHelper("hero-role-db.json"),
            fetchDataHelper("role-combination-db.json"),
            fetchDataHelper("role-talent-core-db.json"),
            fetchDataHelper("main-talent-core-db.json")
        ]);
        await populateHeroRolesMap(heroRoleData, roleCombinationData);
        await populateRoleTalentCoreMap(roleTalentCoreData, mainTalentCoreData);
    } catch (error) {
        console.error("❌ Error populating data:", error);
    }
};

module.exports = { populateData };