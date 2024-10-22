import { Request, Response, NextFunction } from "express";
import axios from "axios";

interface VerifyResponse {
  data: { id: string };
}

const middleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      throw new Error("No token provided");
    }

    const response = await axios.get<null, VerifyResponse>(
      "http://gateway:80/auth/verify",
      {
        headers: {
          authorization: token,
        },
      },
    );

    const { id } = response.data;

    req.headers["userId"] = id;
    next();
  } catch (e) {
    res.status(401).send("Unauthorized");
  }
};

export default middleware;
