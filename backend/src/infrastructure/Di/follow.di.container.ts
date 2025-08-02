import { ToggleLikePost } from "../../application/use-cases/ToggleLikePost";
import { DBFollowRepository } from "../repositories/db.follow.repository";
import { DBLikeRepository } from "../repositories/db.like.repository";

export class FollowDIContainer {
  static getFollowRepository() {
    return new DBFollowRepository();
  }

  static getToggleFollowUsecase() {
    return new ToggleLikePost(this.getToggleFollowUsecase());
  }
}
