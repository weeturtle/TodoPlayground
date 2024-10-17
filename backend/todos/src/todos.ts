import { Router } from "express";
import prisma from "./prisma";

const router = Router();

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

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
  userId: string;
  title: string;
}

router.post("/", async (req, res) => {
  const { userId, title }: INewTodo = req.body;

  console.log(`userId: ${userId}, title: ${title}`);

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
