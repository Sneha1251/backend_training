import { Schema } from "joi";
const userSchema: {
  [key: string]: Schema;
} = require("../assignment-3/config/validationRules");
import { Request, Response, NextFunction } from "express";

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const route = req.originalUrl;

  if (!userSchema[route]) {
    return next();
  }
  const { error } = userSchema[route].validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export default validateRequest;
