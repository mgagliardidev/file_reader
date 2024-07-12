import express, { Request, Response } from "express";
import { FileReaderResponse } from "../types/filleReaderRespose";

const router = express.Router();
const bodyParser = require("body-parser").json();

router.post("/local", bodyParser, (req: Request, res: Response) => {
  readFileLocal(req, res);
});

router.post("/web", bodyParser, async (req: Request, res: Response) => {
  await readFileWeb(req, res);
});

async function readFileWeb(req: Request, res: Response): Promise<void> {
  const resBody: FileReaderResponse = {
    isError: false,
  };

  const fileUrl = req.body.fileUrl;

  if (!fileUrl || !fileUrl.length) {
    resBody.isError = true;
    resBody.errorMessage = "File url not provided";
    res.json(resBody);
    return;
  }

  let text: string = "";

  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      resBody.isError = true;
      resBody.errorMessage = "Cannot read file from url";
      res.json(resBody);
      return;
    }

    if (!response.headers.get("content-type")?.includes("text/plain")) {
      resBody.isError = true;
      resBody.errorMessage =
        "File type not supported (only plain text files are supported)";
      res.json(resBody);
      return;
    }

    text = await response.text();
  } catch (e) {
    resBody.isError = true;
    resBody.errorMessage = "Error while opening the url";
    res.json(resBody);
    return;
  }

  elaborateData(text, resBody);
  res.json(resBody);
}

function readFileLocal(req: Request, res: Response): void {
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
  let text: string = "";
  console.log(`Reading file ${filePath}`);
  while ((line = lineReader.next())) {
    text += `${line.toString("ascii")}\n`;
    lineIndex++;
  }

  console.log(`Done reading file ${filePath}`);

  elaborateData(text, resBody);

  res.json(resBody);
}

function elaborateData(text: string, resBody: FileReaderResponse) {
  // TODO change logic to reduce iterations
  resBody.numberOfChars = text.match(/\S/g)?.length ?? 0;
  resBody.numberOfWords = text.match(/\b\w+\b/g)?.length ?? 0;
  resBody.numberOfSpaces = text.split(" ").length - 1;
  resBody.repeatedWordsObject = {};

  for (const w of text.match(/\b\w+\b/g)!) {
    if (resBody.repeatedWordsObject[w]) {
      resBody.repeatedWordsObject[w]++;
    } else {
      resBody.repeatedWordsObject[w] = 1;
    }
  }
}

module.exports = router;
