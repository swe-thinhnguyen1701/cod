const fs  = require("fs");

const saveFile = (fileName, data) => {
    fs.writeFile(
        `./db/${fileName}`,
        JSON.stringify(data),
        (err) => {
            if (err) {
                console.error(err);
                return;
            } else {
                console.log(`${fileName} is written successfully!`);
            }
        }
    );
}

module.exports = saveFile;