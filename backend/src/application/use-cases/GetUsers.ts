import { IUserRepository } from "../../domain/interface/user.repository";

export class GetUsers {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: number): Promise<any> {
    const users = await this.userRepository.getAllUsersWithFollowStatus(userId);

    return users;
  }
}
