import { Post } from "../../domain/entities/post.entity";
import { IPostRepository } from "../../domain/interface/post.repository";
import { db } from "../database/db";

export class DBPostRepository implements IPostRepository {
  async createPost(post: Post): Promise<void> {
    await db.query("INSERT INTO posts (user_id, content) VALUES (?, ?)", [
      post.user_id,
      post.content,
    ]);
  }

  async getAll(userId: number, offset: number, limit: number): Promise<Post[]> {
    const [rows] = await db.query(
      `
    SELECT posts.*, users.name FROM posts
    JOIN users ON users.id = posts.user_id
    WHERE posts.user_id IN (
      SELECT following_id FROM follows WHERE follower_id = ?
      UNION
      SELECT ?
    )
    ORDER BY posts.created_at DESC
    LIMIT ? OFFSET ?
    `,
      [userId, userId, limit, offset]
    );
    return rows as Post[];
  }

  async count(): Promise<number> {
    const [rows] = await db.query(`SELECT COUNT(*) as count FROM posts`);
    return (rows as any)[0].count;
  }
}
