import { Application } from "express";

var request = require("supertest");
var app: Application = require("../src/app");

test("return text info", async () => {
  const response = await request(app).post("/readFile/local").send({
    filePath: "C:\\Dev\\file_reader\\testFiles\\test_unit.txt",
  });
  expect(response.status).toBe(200);

  expect(response.body).toEqual({
    isError: false,
    numberOfWords: 17,
    numberOfChars: 94,
    numberOfSpaces: 8,
    repeatedWordsObject: {
      arancia: 10,
      ci: 1,
      sono: 1,
      8: 1,
      in: 1,
      questa: 1,
      riga: 1,
      spazi: 1,
    },
  });
});


