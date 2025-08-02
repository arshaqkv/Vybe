import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/interface/user.repository";
import { db } from "../database/db";

export class DBUserRepository implements IUserRepository {
  async createUser(user: User): Promise<void> {
    await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [user.name, user.email, user.password]
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    const users = rows as User[];
    return users[0] || null;
  }

  async findById(id: string): Promise<User | null> {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);

    const users = rows as User[];
    return users[0] || null;
  }

  async getAllUsersWithFollowStatus(
    id: number
  ): Promise<{ id: number; name: string; isFollowing: boolean }[]> {
    const [rows] = await db.query(
      `
    SELECT 
      u.id,
      u.name,
      EXISTS (
        SELECT 1 FROM follows f 
        WHERE f.follower_id = ? AND f.following_id = u.id
      ) AS isFollowing
    FROM users u
    WHERE u.id != ?
    `,
      [id, id]
    );

    const users = (rows as any[]).map((user) => ({
      id: user.id,
      name: user.name,
      isFollowing: Boolean(user.isFollowing),
    }));

    return users;
  }
}
