import { Request, Response, NextFunction } from "express";

const customHeader =
  (customHeaderValue: string) =>
  (req: Request, res: Response, next: NextFunction): void => {
    res.setHeader("X-custom-Header", customHeaderValue);
    next();
  };

export default customHeader;
