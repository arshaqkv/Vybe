import { NextFunction, Request, Response } from "express";
import { FollowDIContainer } from "../../infrastructure/Di/follow.di.container";
import { HttpStatus } from "../../utils/http.status";

class FollowController {
  async toggleFollowPost(req: Request, res: Response, next: NextFunction) {
    const postId = parseInt(req.params.id);
    const userId = parseInt(req.user?.id);
    try {
      const toggleLike = FollowDIContainer.getToggleFollowUsecase();
      const status = await toggleLike.execute(userId, postId);
      res.status(HttpStatus.OK).json({ message: `Post ${status}` });
    } catch (error: any) {
      next(error);
    }
  }
}

export const followController = new FollowController();
