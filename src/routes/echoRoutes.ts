import { Router } from "express";
import { z } from "zod";
import { echoRequest } from "../controllers/echoController";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

const echoSchema = z.object({
  body: z.object({
    message: z.string().min(1)
  })
});

router.post("/echo", validateRequest(echoSchema), echoRequest);

export default router;
