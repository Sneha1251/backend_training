import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface Payload {
  id: number;
  email: string;
  roles: string;
}
const generateDummyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const payload: Payload = {
    id: 1,
    email: "sneha123@gmail.com",
    roles: "trainee engineer",
  };

  const token = jwt.sign(payload, process.env.JWT_SECURITY_KEY as string);
  req.headers.authorization = "Bearer" + " " + token;
  next();
};

export default generateDummyToken;
