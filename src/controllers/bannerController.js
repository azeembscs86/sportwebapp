import {
  addBanner,
  editBanner,
  findBanner,
  listBanners,
  listOnlineBanners,
  removeBanner
} from "../services/bannerService.js";

/**
 * Handle request to list all banners.
 */
export const getAllBanners = async (
  _request,
  response,
  next
) => {
  try {
    const banners = await listBanners();
    response.status(200).json(banners);
  } catch (error) {
    next(error);
  }
};

/**
 * Handle request to list online banners.
 */
export const getOnlineBannerList = async (
  _request,
  response,
  next
) => {
  try {
    const banners = await listOnlineBanners();
    response.status(200).json(banners);
  } catch (error) {
    next(error);
  }
};

/**
 * Handle request to create a banner.
 */
export const createBannerHandler = async (
  request,
  response,
  next
) => {
  try {
    const { bannerUrl, isOnline } = request.body;
    const banner = await addBanner(bannerUrl, isOnline);
    response.status(201).json(banner);
  } catch (error) {
    next(error);
  }
};

/**
 * Handle request to update a banner.
 */
export const updateBannerHandler = async (
  request,
  response,
  next
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

/**
 * Handle request to delete a banner.
 */
export const deleteBannerHandler = async (
  request,
  response,
  next
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

/**
 * Handle request to fetch a banner by id.
 */
export const getBannerByIdHandler = async (
  request,
  response,
  next
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
