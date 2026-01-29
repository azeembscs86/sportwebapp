import { NextFunction, Request, Response } from "express";
import {
  addBanner,
  editBanner,
  findBanner,
  listBanners,
  listOnlineBanners,
  removeBanner
} from "../services/bannerService";

export const getAllBanners = async (
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const banners = await listBanners();
    response.status(200).json(banners);
  } catch (error) {
    next(error);
  }
};

export const getOnlineBannerList = async (
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const banners = await listOnlineBanners();
    response.status(200).json(banners);
  } catch (error) {
    next(error);
  }
};

export const createBannerHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { bannerUrl, isOnline } = request.body;
    const banner = await addBanner(bannerUrl, isOnline);
    response.status(201).json(banner);
  } catch (error) {
    next(error);
  }
};

export const updateBannerHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { bannerId } = request.params;
    const { bannerUrl, isOnline } = request.body;
    const updated = await editBanner(Number(bannerId), bannerUrl, isOnline);
    if (!updated) {
      return response.status(404).json({ message: "Banner not found" });
    }
    response.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteBannerHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { bannerId } = request.params;
    const affectedRows = await removeBanner(Number(bannerId));
    if (affectedRows === 0) {
      return response.status(404).json({ message: "Banner not found" });
    }
    response.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getBannerByIdHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { bannerId } = request.params;
    const banner = await findBanner(Number(bannerId));
    if (!banner) {
      return response.status(404).json({ message: "Banner not found" });
    }
    response.status(200).json(banner);
  } catch (error) {
    next(error);
  }
};
