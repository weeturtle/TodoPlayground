import { Router } from "express";

const router = Router();

interface ILogin {
  email: string;
  password: string;
}

router.post("/login", (req, res) => {
  const { email, password }: ILogin = req.body;

  if (!email || !password) {
    res.status(400).send("Email and password are required");
  }

  res.status(200).send("Logged in");
});

router.post("/register", (req, res) => {
  const { email, password }: ILogin = req.body;

  if (!email || !password) {
    res.status(400).send("Email and password are required");
  }

  res.status(200).send("Registered");
});

export default router;
