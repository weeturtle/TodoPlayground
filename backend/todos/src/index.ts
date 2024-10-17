import express from "express";
import bodyParser from "body-parser";
import todoRouter from "./todos";

const main = async () => {
  const jsonParser = bodyParser.json();
  const app = express();
  app.use(jsonParser);
  const port = 4001;

  app.get("/", async (_, res) => {
    res.status(200);
  });

  app.use("/todos", todoRouter);

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
};

main();
