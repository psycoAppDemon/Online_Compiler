const express = require("express");
// const { generateInputFile  } = require("./generateInputFile.js");
//const { generateCodeFile } = require("./generateCodeFile.js");
const { generateInputFile, generateCodeFile  } = require("./generateFile.js");
const { executeCPP } = require("./runFile.js");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.post("/run", async (req, res) => {
  const { language = "cpp", code, input } = req.body; // default language is cpp
  if (!code) {
    return res.status(400).json({
      message: "Code is empty",
    });
  }
  try {
    const codePath = await generateCodeFile(language, code);
    const inputPath = await generateInputFile(input);
    const output = await executeCPP(codePath, inputPath);
    return res.status(200).json({
      output
    });
  } catch (error) {
    console.log("Error in generating the file", error.message);
  }
});

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
