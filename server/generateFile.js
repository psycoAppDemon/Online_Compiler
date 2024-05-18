const fs = require("fs");
const path = require("path");
const { v4: uuid } = require('uuid'); // rename v4 as uuid

const dirCodes = path.join(__dirname,'code');// __dirname gives the path to current path

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes, {recursive: true});//mkdirSync
}

const dirInputs = path.join(__dirname,'input');// __dirname gives the path to current path

if(!fs.existsSync(dirInputs)){
    fs.mkdirSync(dirInputs, {recursive: true});//mkdirSync
}

const generateCodeFile = async (language, code) => {
    const submissionId = uuid();
    const fileName = `${submissionId}.${language}`;
    const filePath = path.join(dirCodes,fileName);
    await fs.writeFileSync(filePath,code);// why sync method when function is async
    return filePath;
};
const generateInputFile = async (input) => {
    const inputId = uuid();
    const fileName = `${inputId}.txt`;
    const filePath = path.join(dirInputs,fileName);
    console.log(filePath);
    await fs.writeFileSync(filePath,input);
    return filePath;
};

module.exports = {  generateInputFile, generateCodeFile };
