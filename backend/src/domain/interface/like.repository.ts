export interface ILikeRepository {
  toggleLike(userId: number, postId: number): Promise<string>;
}
