import { Request, Response } from "express";

class HealthCheckController {
  public checkHealth(req: Request, res: Response): void {
    res.status(200).json({ message: "I am fine thankyou" });
  }
}

export default new HealthCheckController();
