import express, { Express, Request, Response, Application } from "express";
import path from 'path';

const app: Application = express();
const port = 3000;
const homePath = path.join(__dirname, '/view/index.html');

app.get("/", (req: Request, res: Response) => {
  res.sendFile(homePath);
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});


