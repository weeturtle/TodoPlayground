import { Router } from "express";
import bcrypt from "bcrypt";
import prisma from "../prisma";
import { Prisma } from "@prisma/client";
import { tokenify, verify } from "../util/token";

const router = Router();

interface ILogin {
  email: string;
  password: string;
}

router.post("/login", async (req, res) => {
  const { email, password }: ILogin = req.body;

  if (!email || !password) {
    res.status(400).send("Email and password are required");
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      password: true,
    },
  });

  if (!user) {
    res.status(400).send("User not found");
    return;
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    res.status(400).send("Invalid password");
    return;
  }

  const token = tokenify(user.id);
  res.status(200).json({ token });
});

router.post("/register", async (req, res) => {
  const { email, password }: ILogin = req.body;

  if (!email || !password) {
    res.status(400).send("Email and password are required");
    return;
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    const token = tokenify(user.id);

    res.status(200).json({ token });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).send("User already exists");
    } else {
      res.status(500).send("Internal server error");
    }
  }
});

router.get("/verify", async (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  try {
    if (!token) {
      res.status(400).send("Invalid token");
      return;
    }

    const id = verify(token);

    res.status(200).json({ id });
  } catch (e) {
    res.status(500).send("Internal server error");
  }
});

export default router;
