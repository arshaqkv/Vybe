import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { postController } from "../controllers/post.controller";
import { likeController } from "../controllers/like.controller";

const router = Router();

router.use(isAuthenticated);

router
  .route("/")
  .post(postController.createPost)
  .get(postController.getAllPosts);

router.post("/:id/like", likeController.toggleLikePost);

export { router as postRoutes };
