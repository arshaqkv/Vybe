import { ILikeRepository } from "../../domain/interface/like.repository";

export class ToggleLikePost {
  constructor(private likeRepository: ILikeRepository) {}

  async execute(userId: number, postId: number) {
    return await this.likeRepository.toggleLike(userId, postId);
  }
}
