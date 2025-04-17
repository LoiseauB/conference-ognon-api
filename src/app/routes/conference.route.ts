import { Router } from "express";
import { organizeConference } from "../controllers/conference.controllers";
import { authenticationMiddleware } from "../middlewares/authenticator.middleware";

const router = Router();

router.use(authenticationMiddleware) // toutes les routes en-dessous utilisent ce middleware
router.post("/conference", organizeConference);

export default router;

