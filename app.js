const express = require("express");
const path = require('path');

const app = express();
const port = 3000;
const homePath = path.join(__dirname, '/view/index.html');

const readFileRouter = require('./dist/api/readFile');

app.get("/", (req, res) => {
  res.sendFile(homePath);
});

app.listen(port, () => {
  console.log(`Server is running at '${port}'`);
});

// indexing routes
app.use("/readFile", readFileRouter);
