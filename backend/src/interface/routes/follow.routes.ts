import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { followController } from "../controllers/follow.controller";

const router = Router();

router.use(isAuthenticated);

router.post("/:id/follow", followController.toggleFollowPost);

export { router as followRoutes };
