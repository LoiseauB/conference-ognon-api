import { Router } from "express";
import {
  cancelConference,
  organizeConference,
} from "../controllers/conference.controllers";
import { authenticationMiddleware } from "../middlewares/authenticator.middleware";

const router = Router();

router.use(authenticationMiddleware); // toutes les routes en-dessous utilisent ce middleware
router.post("/conference", organizeConference);
router.delete("/conference/:id", cancelConference);

export default router;
