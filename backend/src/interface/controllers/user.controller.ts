import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../utils/http.status";
import { AuthDIContainer } from "../../infrastructure/Di/auth.di.container";

class UserController {
  async getUsers(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.user.id);
    try {
      const users = await AuthDIContainer.getUsersUseCase().execute(id);
      res.status(HttpStatus.OK).json({ users });
    } catch (error: any) {
      next(error);
    }
  }
}

export const userController = new UserController();
