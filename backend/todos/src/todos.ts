import { Router } from "express";
import prisma from "./prisma";

const router = Router();

router.get("/", async (req, res) => {
  const userId = req.headers["userId"] as string | null;

  if (!userId) {
    res.status(400).send("User ID is required");
    return;
  }

  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId,
      },
    });

    res.status(200).json(todos);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "An error occurred" });
  }
});

interface INewTodo {
  title: string;
}

router.post("/", async (req, res) => {
  const userId = req.headers["userId"] as string | null;
  const { title }: INewTodo = req.body;

  if (!userId) {
    res.status(400).send("User ID is required");
    return;
  }

  try {
    const todo = await prisma.todo.create({
      data: {
        title,
        userId,
      },
    });

    res.status(200).json(todo);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { completed }: { completed: boolean } = req.body;

  try {
    const todo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        completed,
      },
    });

    res.status(200).json(todo);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await prisma.todo.delete({
      where: {
        id,
      },
    });

    res.status(200).json(todo);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "An error occurred" });
  }
});

export default router;
