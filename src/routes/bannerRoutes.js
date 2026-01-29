import { Router } from "express";
import { z } from "zod";
import {
  createBannerHandler,
  deleteBannerHandler,
  getAllBanners,
  getBannerByIdHandler,
  getOnlineBannerList,
  updateBannerHandler
} from "../controllers/bannerController";
import { validateRequest } from "../middlewares/validateRequest";

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

router.get("/banners", getAllBanners);
router.get("/banners/online", getOnlineBannerList);
router.get("/banners/:bannerId", validateRequest(bannerIdSchema), getBannerByIdHandler);
router.post("/banners", validateRequest(bannerPayloadSchema), createBannerHandler);
router.put(
  "/banners/:bannerId",
  validateRequest(bannerIdSchema.merge(bannerPayloadSchema)),
  updateBannerHandler
);
router.delete("/banners/:bannerId", validateRequest(bannerIdSchema), deleteBannerHandler);

export default router;
