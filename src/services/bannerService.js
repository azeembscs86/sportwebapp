import {
  createBanner,
  createBannerTable,
  deleteBanner,
  getBannerById,
  getBanners,
  getOnlineBanners,
  updateBanner
} from "../repositories/bannerRepository";

export const ensureBannerTable = async () => {
  await createBannerTable();
};

export const listBanners = async () => getBanners();

export const listOnlineBanners = async () => getOnlineBanners();

export const addBanner = async (bannerUrl: string, isOnline: boolean) =>
  createBanner(bannerUrl, isOnline);

export const editBanner = async (
  bannerId: number,
  bannerUrl: string,
  isOnline: boolean
) => updateBanner(bannerId, bannerUrl, isOnline);

export const removeBanner = async (bannerId: number) => deleteBanner(bannerId);

export const findBanner = async (bannerId: number) => getBannerById(bannerId);
