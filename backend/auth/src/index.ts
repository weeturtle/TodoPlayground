import express from "express";
import bodyParser from "body-parser";
import authRouter from "./routes/external";

const main = async () => {
  const jsonParser = bodyParser.json();
  const app = express();
  app.use(jsonParser);
  const port = 4002;

  app.get("/", async (_, res) => {
    res.status(200).send("Server running");
  });

  app.use("/auth", authRouter);

  app.use(authRouter);

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
};

main();
