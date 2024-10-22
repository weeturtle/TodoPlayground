import express from "express";
import bodyParser from "body-parser";
import todoRouter from "./todos";
import middleware from "./middleware";

const main = async () => {
  const jsonParser = bodyParser.json();
  const app = express();
  app.use(jsonParser);
  const port = 4001;

  app.use(middleware);

  // For debugging purposes
  // app.use((req, res, next) => {
  //   console.log(`Method: ${req.method}`);
  //   console.log(`Path: ${req.path}`);
  //   next();
  // });

  app.use("/todos", todoRouter);

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
};

main();
