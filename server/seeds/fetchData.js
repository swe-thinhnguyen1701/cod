const s3Client = require("../config/awsConnection");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const fetch = require("node-fetch");
require("dotenv").config();

const fetchDataHelper = async (fileName) => {
    const command = new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: `${fileName}`
    });
    const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });
    const res = await fetch(url);
    return await res.json();
}

const fetchData = async () => {
    try {
        const [heroData, heroSkillData, heroRoleData, roleCombinationData, roleData, talentCoreData] = await Promise.all([
            fetchDataHelper("hero-db.json"),
            fetchDataHelper("skill-db.json"),
            fetchDataHelper("hero-role-db.json"),
            fetchDataHelper("role-combination-db.json"),
            fetchDataHelper("role-db.json"),
            fetchDataHelper("talent-core-db.json")
        ]);

        return { heroData, heroSkillData, heroRoleData, roleCombinationData, roleData, talentCoreData };
    } catch (error) {
        console.error("❌ Error fetching data:", error);
    }
}

module.exports = fetchData;