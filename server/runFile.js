const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const dirOutput = path.join(__dirname, "output"); // __dirname gives the path to current path

if (!fs.existsSync(dirOutput)) {
  fs.mkdirSync(dirOutput, { recursive: true }); //mkdirSync
}

const executeCPP = async (filePath) => {
  const submissionId = path.basename(filePath).split(".")[0];
  const outPath = path.join(dirOutput, `${submissionId}.exe`);
  console.log(outPath,dirOutput,submissionId);
  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filePath} -o ${outPath} && cd ${dirOutput} && .\\${submissionId}.exe`,
      (err, stdout, stderr) => {
        if (err) {
          reject(err);
        }
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      }
    );
  });
};

module.exports = { executeCPP };
