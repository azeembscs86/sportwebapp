import { Router } from "express";
import { z } from "zod";
import { echoRequest } from "../controllers/echoController.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = Router();

const echoSchema = z.object({
  body: z.object({
    message: z.string().min(1)
  })
});

/** Echo payload after validation. */
router.post("/echo", validateRequest(echoSchema), echoRequest);

export default router;
