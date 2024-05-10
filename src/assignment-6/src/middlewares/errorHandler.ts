import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: String,
  req: Request,
  res: Response,
  next: NextFunction
): object => {
  return res.status(500).json({ error: "Internal Server Error" });
};

export default errorHandler;
