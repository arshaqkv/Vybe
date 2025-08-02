import { NextFunction, Request, Response } from "express";
import { PostDIContainer } from "../../infrastructure/Di/post.di.container";
import { HttpStatus } from "../../utils/http.status";

class PostController {
  async createPost(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.user.id);
    const { content } = req.body;

    try {
      await PostDIContainer.getCreatePostRepositoryUseCase().execute({
        content,
        user_id: id,
      });
      res.status(HttpStatus.CREATED).json({ message: "New post created" });
    } catch (error: any) {
      next(error);
    }
  }

  async getAllPosts(req: Request, res: Response, next: NextFunction) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    try {
      const getAllPosts = PostDIContainer.getAllPostsUseCase();
      const posts = await getAllPosts.execute(page, limit);
      res.status(HttpStatus.OK).json(posts);
    } catch (error: any) {
      next(error);
    }
  }
}

export const postController = new PostController();
