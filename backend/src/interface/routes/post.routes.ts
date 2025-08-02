import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { postController } from "../controllers/post.controller";

const router = Router();

router.post("/", isAuthenticated, postController.createPost);

export { router as postRoutes };
