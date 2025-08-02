import { ToggleLikePost } from "../../application/use-cases/ToggleLikePost";
import { DBLikeRepository } from "../repositories/db.like.repository";

export class LikeDIContainer {
  static getLikeRepository() {
    return new DBLikeRepository();
  }

  static getToggleLikeUsecase() {
    return new ToggleLikePost(this.getLikeRepository());
  }
}
