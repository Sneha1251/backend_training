import express, { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import dotenv from "dotenv";
dotenv.config();

import validateRequest from "../middlewares/validateRequest";
import queryValidation from "../middlewares/queryValidation";
import locationValidation from "../middlewares/locationValidation";
import { generateUsers } from "../generateDataFunction";
import { generatePosts } from "../generateDataFunction";
import jwtAuthentication from "../middlewares/jwtAuthentication";
import generateDummyToken from "../middlewares/generateDummyToken";
import requestLogger from "../middlewares/logger";
import errorHandler from "../middlewares/errorHandler";
import customHeader from "../middlewares/customHeader";
import rateLimiter from "../middlewares/rateLimiter";
import validationError from "../middlewares/validationError";
import {
  middleware1,
  middleware2,
  middleware3,
} from "../middlewares/middlewareChain";

const app = express();

app.use(requestLogger);
app.use(customHeader("MyCustomValue"));
app.use(rateLimiter(1));

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to Home Page" });
});

app.post("/validate", validateRequest, (req: Request, res: Response) => {
  res.json({ message: "user validated!" });
});

app.get("/location", locationValidation, (req: Request, res: Response) => {
  res.json({ message: "user can access" });
});

app.post("/query/:id", queryValidation, (req: Request, res: Response) => {
  res.json({ message: `user ${req.params.id}` });
});

app.get("/api/users", (req: Request, res: Response) => {
  const users = generateUsers();
  res.json(users);
});

app.post("/api/posts", (req: Request, res: Response) => {
  const posts = generatePosts();
  res.json(posts);
});

app.get(
  "/authenticate/protected",
  generateDummyToken,
  jwtAuthentication,
  (req: Request, res: Response) => {
    res.json({ message: "Authentication successful" });
  }
);

app.get("/authenticate/public", (req: Request, res: Response) => {
  res.json({ message: "This is a public route" });
});

app.get("/middleware", middleware1, middleware2, middleware3, (req, res) => {
  res.json("Middleware check Done");
});

app.get("/error-500", (req: Request, res: Response, next: NextFunction) => {
  next(createError(500, "Internal server Error"));
});

app.get(
  "/async-error",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      throw new Error("Async Error");
    } catch (err) {
      next(err);
    }
  }
);

app.get(
  "/validation/error/:id",
  validationError,
  (req: Request, res: Response) => {
    res.status(200).json({ message: "User details retreived successfully" });
  }
);

app.use(errorHandler);

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
