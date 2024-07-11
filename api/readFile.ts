import express, { Request, Response } from "express";
import { FileReaderResponse } from "./types/filleReaderRespose";

const router = express.Router();
const bodyParser = require("body-parser").json();

router.post("/", bodyParser, (req: Request, res: Response) => {
  const resBody: FileReaderResponse = {
    isError: false,
  };

  const filePath = req.body.filePath;

  if (!filePath || !filePath.length) {
    resBody.isError = true;
    resBody.errorMessage = "File path not provided";
    res.json(resBody);
    return;
  }

  const nReadLines = require("n-readlines");
  let lineReader;

  try {
    lineReader = new nReadLines(filePath);
  } catch (e) {
    resBody.isError = true;
    resBody.errorMessage = "File not found";
    res.json(resBody);
    return;
  }

  let line;
  let lineIndex = 1;
  console.log(`Reading file ${filePath}`);
  while ((line = lineReader.next())) {
    console.log(`${line.toString('ascii').trim()}`)
    lineIndex++;
  }
  console.log(`Done reading file ${filePath}`);

  res.json(resBody);
    return;
});

module.exports = router;
