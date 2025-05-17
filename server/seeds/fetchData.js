const s3Client = require("../config/awsConnection");
const { GetObjectCommand, ListObjectVersionsCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const fetch = require("node-fetch");
require("dotenv").config();

const FILE_NAMES = [
    "hero-db.json",
    "artifact-db.json",
    "skill-db.json",
    "hero-role-db.json",
    "role-combination-db.json",
    "role-db.json",
    "talent-core-db.json",
    "stat-db.json",
    "artifact-stat-db.json"
];

const getLatestVersionId = async (fileName) => {
    const command = new ListObjectVersionsCommand({
        Bucket: process.env.BUCKET_NAME,
        Prefix: fileName
    });

    const res = await s3Client.send(command);
    const latestVersion = res.Versions.find(v => v.Key === fileName && v.IsLatest);
    return latestVersion?.VersionId;
}

const fetchDataHelper = async (fileName, versionId = null) => {
    const commandParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${fileName}`
    };

    if (versionId) {
        commandParams.VersionId = versionId;
    }

    const command = new GetObjectCommand(commandParams);
    const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });
    const res = await fetch(url);
    return await res.json();
}

const fetchData = async () => {
    try {
        const versionIdMap = {};
        await Promise.all(FILE_NAMES.map(async (fileName) => {
            versionIdMap[fileName] = await getLatestVersionId(fileName);
        }))

        const [heroData, artifactData, heroSkillData, heroRoleData, roleCombinationData, roleData, talentCoreData, statData, artifactStatData] = await Promise.all(FILE_NAMES.map(fileName => fetchDataHelper(fileName, versionIdMap[fileName])));

        return { heroData, artifactData, heroSkillData, heroRoleData, roleCombinationData, roleData, talentCoreData, statData, artifactStatData };
    } catch (error) {
        console.error("❌ Error fetching data:", error);
    }
}

/**
 * Fetch data from a specific file id:
 * 
 * 0: "hero-db.json"
 * 
 * 1: "artifact-db.json"
 * 
 * 2: "skill-db.json"
 * 
 * 3: "hero-role-db.json"
 * 
 * 4: "role-combination-db.json"
 * 
 * 5: "role-db.json"
 * 
 * 6: "talent-core-db.json"
 * 
 * 7: "stat-db.json"
 * 
 * 8: "artifact-stat-db.json"
 * @param {*} fileId 
 * @returns data as a json object
 */
const getDataByFileId = async (fileId) => {
    const fileName = FILE_NAMES[fileId];
    const versionId = await getLatestVersionId(fileName);
    return await fetchDataHelper(fileName, versionId);
}

module.exports = { fetchData, getDataByFileId };