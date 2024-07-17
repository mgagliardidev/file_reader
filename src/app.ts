import express, { Express, Request, Response, Application } from "express";
import path from 'path';

const app: Application = express();
const port = 3000;
const rootPath = require('get-root-path');

const readFileRouter = require('./api/readFile');

app.use( express.static( path.join( rootPath.default, 'src', 'view' ) ) );
app.use( express.static( path.join( rootPath.default, 'dist', 'public' ) ) );

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(rootPath.default, 'src', 'view', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at '${port}'`);
});

// indexing routes
app.use("/readFile", readFileRouter);
