import { User } from "../entities/user.entity";

export interface IUserRepository {
  createUser(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  getAllUsersWithFollowStatus(id: number): Promise<any>;
}
