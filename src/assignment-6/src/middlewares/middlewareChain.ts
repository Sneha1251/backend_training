import { Request, Response, NextFunction } from "express";

const middleware1 = (req: Request, res: Response, next: NextFunction): void => {
  console.log("Middleware 1");
  next();
};

const middleware2 = (req: Request, res: Response, next: NextFunction): void => {
  console.log("Middleware 2");
  next();
};

const middleware3 = (req: Request, res: Response, next: NextFunction): void => {
  console.log("Middleware 3");
  next();
};

export { middleware1, middleware2, middleware3 };
