import { ToggleFollow } from "../../application/use-cases/ToggleFollow";
import { ToggleLikePost } from "../../application/use-cases/ToggleLikePost";
import { DBFollowRepository } from "../repositories/db.follow.repository";

export class FollowDIContainer {
  static getFollowRepository() {
    return new DBFollowRepository();
  }

  static getToggleFollowUsecase() {
    return new ToggleFollow(this.getFollowRepository());
  }
}
