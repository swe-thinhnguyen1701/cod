const fs = require("fs");
const path = require("path");
const {PutObjectCommand} = require("@aws-sdk/client-s3");
const s3Client = require("../../config/awsConnection");

const uploadFile = async (fileName) => {
    const fileContent = fs.readFileSync(path.join(__dirname, `../../db`, fileName));
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: fileName,
        Body: fileContent
    };

    try {
        const data = await s3Client.send(new PutObjectCommand(params));
        console.log(`File uploaded successfully. ${data}`);
    } catch (err) {
        console.error("Error uploading file:", err);
    }
};

module.exports = { uploadFile };