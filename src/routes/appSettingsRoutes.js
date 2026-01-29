import { Router } from "express";
import { z } from "zod";
import {
  createAppSetting,
  deleteAppSetting,
  getAppSettingById,
  getAppSettings,
  updateAppSetting
} from "../controllers/appSettingsController.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = Router();

const appSettingPayloadSchema = z.object({
  body: z.object({
    platform: z.string().min(1),
    isOnline: z.boolean()
  })
});

const appSettingIdSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive()
  })
});

/** List app settings (cached). */
router.get("/app-settings", getAppSettings);
/** Fetch an app setting by id. */
router.get("/app-settings/:id", validateRequest(appSettingIdSchema), getAppSettingById);
/** Create an app setting. */
router.post("/app-settings", validateRequest(appSettingPayloadSchema), createAppSetting);
/** Update an app setting. */
router.put(
  "/app-settings/:id",
  validateRequest(appSettingIdSchema.merge(appSettingPayloadSchema)),
  updateAppSetting
);
/** Delete an app setting. */
router.delete("/app-settings/:id", validateRequest(appSettingIdSchema), deleteAppSetting);

export default router;
