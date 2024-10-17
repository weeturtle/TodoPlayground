import express from "express";
import bodyParser from "body-parser";
import todoRouter from "./todos";

const main = async () => {
  const jsonParser = bodyParser.json();
  const app = express();
  app.use(jsonParser);
  const port = 4001;

  app.use("", todoRouter);

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
};

main();
