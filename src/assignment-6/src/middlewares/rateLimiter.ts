import { Request, Response, NextFunction } from "express";

const rateLimiter =
  (limit: number) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const requests = new Map<string, number>();
    const ip: string = req.ip || "unknown";
    const current = requests.get(ip) || 0;

    if (current >= limit) {
      res.status(429).json({ error: "Too many Requests" });
      return;
    }

    requests.set(ip, current + 1);
    next();

    setTimeout(() => {
      requests.delete(ip);
    }, 5000);
    console.log(requests);
  };

export default rateLimiter;
