import { Request, Response, NextFunction } from "express";

const validationError = (
  req: Request,
  res: Response,
  next: NextFunction
): void | object => {
  const { id } = req.params;
  if (!id || isNaN(Number(id))) {
    return res.json("Id must be a number");
  }

  next();
};
export default validationError;
