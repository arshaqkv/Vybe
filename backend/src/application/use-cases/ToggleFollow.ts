import { IFollowRepository } from "../../domain/interface/follow.repository";
import { CustomError } from "../../interface/middlewares/error.middleware";
import { HttpStatus } from "../../utils/http.status";

export class ToggleFollow {
  constructor(private followRepo: IFollowRepository) {}

  async execute(followerId: number, followingId: number) {
    if (followerId === followingId)
      throw new CustomError("Cannot follow yourself", HttpStatus.BAD_REQUEST);

    return await this.followRepo.toggleFollow(followerId, followingId);
  }
}
