const { select } = require("@inquirer/prompts");
const { uploadFile } = require("./upload-s3");

const FILE_NAMES = [
    "hero-db.json",
    "hero-role-db.json",
    "skill-db.json",
    "artifact-db.json",
    "stat-db.json",
    "artifact-stat-db.json",
]

const OPTIONS = [];

const createOptions = () => {
    FILE_NAMES.forEach((fileName, index) => {
        OPTIONS.push({
            name: fileName,
            value: index,
        });
    });

    OPTIONS.push({
        name: "Exit",
        value: -1,
    });
}

const awsMenu = async () => {
    createOptions();
    const answer = await select({
        message: "Select a file to send to AWS S3",
        choices: OPTIONS,
    });

    if(answer === -1)
        return;

    uploadFile(FILE_NAMES[answer]);
}

module.exports = { awsMenu };