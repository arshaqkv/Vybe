import { Post } from "../../domain/entities/post.entity";
import { IPostRepository } from "../../domain/interface/post.repository";
import { CustomError } from "../../interface/middlewares/error.middleware";
import { HttpStatus } from "../../utils/http.status";

export class CreatePost {
  constructor(private postRepository: IPostRepository) {}

  async execute(post: Post): Promise<void> {
    if (!post.content || !post.user_id) {
      throw new CustomError(
        "Post content and user_id are required",
        HttpStatus.BAD_REQUEST
      );
    }
    await this.postRepository.createPost(post);
  }
}
