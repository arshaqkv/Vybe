import { NextFunction, Request, Response } from "express";
import { LikeDIContainer } from "../../infrastructure/Di/like.di.container";
import { HttpStatus } from "../../utils/http.status";

class LikeController {
  async toggleLikePost(req: Request, res: Response, next: NextFunction) {
    const postId = parseInt(req.params.id);
    const userId = parseInt(req.user?.id);
    try {
      const toggleLike = LikeDIContainer.getToggleLikeUsecase();
      const status = await toggleLike.execute(userId, postId);
      res.status(HttpStatus.OK).json({ message: `Post ${status}` });
    } catch (error: any) {
      next(error);
    }
  }
}

export const likeController = new LikeController();
