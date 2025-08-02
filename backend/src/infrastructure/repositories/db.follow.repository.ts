import { IFollowRepository } from "../../domain/interface/follow.repository";
import { db } from "../database/db";

export class DBFollowRepository implements IFollowRepository {
  async toggleFollow(followerId: number, followingId: number): Promise<string> {

    const [rows] = await db.query(
      "SELECT * FROM follows WHERE follower_id = ? AND following_id = ?",
      [followerId, followingId]
    );

    if ((rows as any).length > 0) {
      await db.query(
        "DELETE FROM follows WHERE follower_id = ? AND following_id = ?",
        [followerId, followingId]
      );
      return "unfollowed";
    } else {
      await db.query(
        "INSERT INTO follows (follower_id, following_id) VALUES (?, ?)",
        [followerId, followingId]
      );
      return "followed";
    }
  }
}
