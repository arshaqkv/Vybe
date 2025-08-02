import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { followController } from "../controllers/follow.controller";
import { userController } from "../controllers/user.controller";

const router = Router();

router.use(isAuthenticated);

router.post("/:id/follow", followController.toggleFollowPost);
router.get("/suggestions", userController.getUsers);

export { router as followRoutes };
