import express from "express";

const main = () => {
  const app = express();
  const port = 4001;

  app.get("/", (_, res) => {
    res.send("App is running");
  });

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
};

main();
