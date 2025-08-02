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
}
