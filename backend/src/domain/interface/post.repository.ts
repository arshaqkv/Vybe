import { Post } from "../entities/post.entity";

export interface IPostRepository {
  createPost(post: Post): Promise<void>;
  getAll(userId: number, offset: number, limit: number): Promise<Post[]>;
  count(): Promise<number>;
}
