import { NextFunction, Request, Response } from "express";
import { FollowDIContainer } from "../../infrastructure/Di/follow.di.container";
import { HttpStatus } from "../../utils/http.status";

class FollowController {
  async toggleFollowPost(req: Request, res: Response, next: NextFunction) {
    const followerId = parseInt(req.user?.id);
    const followingId = parseInt(req.params.id);
    try {
      const toggleFollow = FollowDIContainer.getToggleFollowUsecase();
      const status = await toggleFollow.execute(followerId, followingId);
      res.status(HttpStatus.CREATED).json({ message: `User ${status}` });
    } catch (error: any) {
      next(error);
    }
  }
}

export const followController = new FollowController();
