import { Request, Response, NextFunction } from "express";
import createError from "http-errors";

import { generateUsers } from "../generateDataFunction";
import { generatePosts } from "../generateDataFunction";

export class homePage {
  mainPage(req: Request, res: Response): void {
    res.json({ message: "Welcome to Home Page" });
  }
}

export class userValidation {
  validateUser(req: Request, res: Response): void {
    res.json({ message: "user validated!" });
  }
}

export class locationValidate {
  validateLoco(req: Request, res: Response): void {
    res.json({ message: "user can access" });
  }
}

export class queryValidate {
  validateQuery(req: Request, res: Response): void {
    res.json({ message: `user ${req.params.id}` });
  }
}

export class generateApiUser {
  generateUserApi(req: Request, res: Response): void {
    const users = generateUsers();
    res.json(users);
  }
}

export class generateApiPost {
  generatePostApi(req: Request, res: Response): void {
    const posts = generatePosts();
    res.json(posts);
  }
}

export class authenticateProtected {
  protectedAuth(req: Request, res: Response): void {
    res.json({ message: "Authentication successful" });
  }
}

export class authenticatePublic {
  publicAuth(req: Request, res: Response): void {
    res.json({ message: "This is a public route" });
  }
}

export class middlewareCheck {
  checkMiddleware(req: Request, res: Response): void {
    res.json("Middleware check Done");
  }
}

export class errorCreated {
  createError(req: Request, res: Response, next: NextFunction): void {
    next(createError(500, "Internal server Error"));
  }
}

export class asyncError {
  async createAsyncError(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      throw new Error("Async Error");
    } catch (err) {
      next(err);
    }
  }
}

export class errorValidation {
  errorValidate(req: Request, res: Response): void {
    res.status(200).json({ message: "User details retreived successfully" });
  }
}

export class HealthCheckController {
  checkHealth(req: Request, res: Response): void {
    res.status(200).json({ message: "I am fine thankyou" });
  }
}
