import { Router } from "express";
import { z } from "zod";
import {
  createBannerHandler,
  deleteBannerHandler,
  getAllBanners,
  getBannerByIdHandler,
  getOnlineBannerList,
  updateBannerHandler
} from "../controllers/bannerController.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = Router();

const bannerPayloadSchema = z.object({
  body: z.object({
    bannerUrl: z.string().url(),
    isOnline: z.boolean()
  })
});

const bannerIdSchema = z.object({
  params: z.object({
    bannerId: z.coerce.number().int().positive()
  })
});

/** List all banners. */
router.get("/banners", getAllBanners);
/** List online banners. */
router.get("/banners/online", getOnlineBannerList);
/** Fetch a banner by id. */
router.get("/banners/:bannerId", validateRequest(bannerIdSchema), getBannerByIdHandler);
/** Create a banner. */
router.post("/banners", validateRequest(bannerPayloadSchema), createBannerHandler);
/** Update a banner. */
router.put(
  "/banners/:bannerId",
  validateRequest(bannerIdSchema.merge(bannerPayloadSchema)),
  updateBannerHandler
);
/** Delete a banner. */
router.delete("/banners/:bannerId", validateRequest(bannerIdSchema), deleteBannerHandler);

export default router;
