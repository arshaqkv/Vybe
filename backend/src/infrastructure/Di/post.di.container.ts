import { CreatePost } from "../../application/use-cases/CreatePost";
import { GetAllPosts } from "../../application/use-cases/GetAllPosts";
import { DBPostRepository } from "../repositories/db.post.repository";

export class PostDIContainer {
  static getPostRepository() {
    return new DBPostRepository();
  }

  static getCreatePostRepositoryUseCase() {
    return new CreatePost(this.getPostRepository());
  }

  static getAllPostsUseCase() {
    return new GetAllPosts(this.getPostRepository());
  }
}
