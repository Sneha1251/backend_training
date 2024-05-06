import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const jwtAuthentication = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized- Token missing" });
  }

  jwt.verify(
    token,
    process.env.JWT_SECURITY_KEY as string,
    (err, user: any) => {
      if (err) {
        return res.status(403).json({ error: "Forbidden- Invalid token" });
      }
      next();
    }
  );
};

export default jwtAuthentication;
