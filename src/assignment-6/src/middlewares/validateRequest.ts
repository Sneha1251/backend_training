import { Request, Response, NextFunction } from "express";

import userSchema from "../validationRules";

const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void | object => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  
  next();
};

export default validateRequest;
