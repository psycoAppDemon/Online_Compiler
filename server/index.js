const express = require("express");
const { generateFile } = require("./generateFile.js");
const { executeCPP } = require("./runFile.js");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.post("/run", async (req, res) => {
  const { language = "cpp", code } = req.body; // default language is cpp
  if (!code) {
    return res.status(400).json({
      message: "Code is empty",
    });
  }
  try {
    const filePath = await generateFile(language, code);
    console.log(filePath);
    const output = await executeCPP(filePath);
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
