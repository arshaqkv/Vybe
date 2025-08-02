import { IPostRepository } from "../../domain/interface/post.repository";

export class GetAllPosts {
  constructor(private postRepository: IPostRepository) {}

  async execute(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    const posts = await this.postRepository.getAll(offset, limit);
    const total = await this.postRepository.count();

    return {
      data: posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
