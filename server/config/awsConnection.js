const { S3Client } = require("@aws-sdk/client-s3");
require("dotenv").config();

const s3Client = new S3Client({
    region: process.env.BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.BUCKER_ACCESS_KEY,
        secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY
    }
});

module.exports = s3Client;