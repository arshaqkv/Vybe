import { ILikeRepository } from "../../domain/interface/like.repository";
import { db } from "../database/db";

export class DBLikeRepository implements ILikeRepository{
    async toggleLike(userId: number, postId: number): Promise<string> {
    const [rows] = await db.query(
      "SELECT * FROM likes WHERE user_id = ? AND post_id = ?",
      [userId, postId]
    );

    if ((rows as any).length > 0) {
      await db.query("DELETE FROM likes WHERE user_id = ? AND post_id = ?", [
        userId,
        postId,
      ]);
      return "unliked";
    } else {
      await db.query("INSERT INTO likes (user_id, post_id) VALUES (?, ?)", [
        userId,
        postId,
      ]);
      return "liked";
    }
  }
}