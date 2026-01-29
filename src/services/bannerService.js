import {
  createBanner,
  createBannerTable,
  deleteBanner,
  getBannerById,
  getBanners,
  getOnlineBanners,
  updateBanner
} from "../repositories/bannerRepository.js";

/**
 * Ensure the Banners table exists.
 * @returns {Promise<void>}
 */
export const ensureBannerTable = async () => {
  await createBannerTable();
};

/**
 * List all banners.
 * @returns {Promise<object[]>}
 */
export const listBanners = async () => getBanners();

/**
 * List online banners.
 * @returns {Promise<object[]>}
 */
export const listOnlineBanners = async () => getOnlineBanners();

/**
 * Create a banner.
 * @param {string} bannerUrl - Banner URL.
 * @param {boolean} isOnline - Online flag.
 * @returns {Promise<object|null>}
 */
export const addBanner = async (bannerUrl, isOnline) =>
  createBanner(bannerUrl, isOnline);

/**
 * Update a banner.
 * @param {number} bannerId - Banner id.
 * @param {string} bannerUrl - Banner URL.
 * @param {boolean} isOnline - Online flag.
 * @returns {Promise<object|null>}
 */
export const editBanner = async (bannerId, bannerUrl, isOnline) =>
  updateBanner(bannerId, bannerUrl, isOnline);

/**
 * Delete a banner.
 * @param {number} bannerId - Banner id.
 * @returns {Promise<number>}
 */
export const removeBanner = async (bannerId) => deleteBanner(bannerId);

/**
 * Find a banner by id.
 * @param {number} bannerId - Banner id.
 * @returns {Promise<object|null>}
 */
export const findBanner = async (bannerId) => getBannerById(bannerId);
