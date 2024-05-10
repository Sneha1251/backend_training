import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const queryValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Object => {
  const { id } = req.params;
  const { error } = Joi.number().validate(id);
  if (error) {
    return res
      .status(400)
      .json({ error: `Query parameter '${id}' must be numeric.` });
  }
  next();
};

export default queryValidation;
