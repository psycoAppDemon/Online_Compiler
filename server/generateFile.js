const fs = require("fs");
const path = require("path");
const { v4: uuid } = require('uuid'); // rename v4 as uuid

const dirCodes = path.join(__dirname,'code');// __dirname gives the path to current path

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes, {recursive: true});//mkdirSync
}

const generateFile = async (language, code) => {
    const submissionId = uuid();
    const fileName = `${submissionId}.${language}`;
    const filePath = path.join(dirCodes,fileName);
    fs.writeFileSync(filePath,code);
    return filePath;
};

module.exports = { generateFile };
