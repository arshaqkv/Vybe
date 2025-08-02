export interface IFollowRepository {
  toggleFollow(followerId: number, followingId: number): Promise<string>;
}
