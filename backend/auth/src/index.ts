import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./routes";

const main = async () => {
  const jsonParser = bodyParser.json();
  const app = express();
  app.use(cors());
  app.use(jsonParser);
  const port = 4002;

  app.use("/auth", authRouter);

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
};

main();
