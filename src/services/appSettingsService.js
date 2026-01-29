import {
  createAppSetting,
  createAppSettingsTable,
  deleteAppSetting,
  getAppSettingById,
  getAppSettings,
  updateAppSetting
} from "../repositories/appSettingsRepository.js";
import { redisClient } from "../config/redis.js";

const APP_SETTINGS_CACHE_KEY = "app_settings:all";

/**
 * Ensure the AppSettings table exists.
 * @returns {Promise<void>}
 */
export const ensureAppSettingsTable = async () => {
  await createAppSettingsTable();
};

/**
 * Clear the cached app settings list.
 * @returns {Promise<void>}
 */
const clearCache = async () => {
  if (redisClient.isOpen) {
    await redisClient.del(APP_SETTINGS_CACHE_KEY);
  }
};

/**
 * List app settings with Redis caching.
 * @returns {Promise<object[]>}
 */
export const listAppSettings = async () => {
  if (redisClient.isOpen) {
    const cached = await redisClient.get(APP_SETTINGS_CACHE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  }

  const settings = await getAppSettings();
  if (redisClient.isOpen) {
    await redisClient.set(APP_SETTINGS_CACHE_KEY, JSON.stringify(settings), {
      EX: 60
    });
  }
  return settings;
};

/**
 * Create an app setting and clear cache.
 * @param {string} platform - Platform identifier.
 * @param {boolean} isOnline - Online flag.
 * @returns {Promise<object|null>}
 */
export const addAppSetting = async (platform, isOnline) => {
  const created = await createAppSetting(platform, isOnline);
  await clearCache();
  return created;
};

/**
 * Update an app setting and clear cache.
 * @param {number} id - AppSettings id.
 * @param {string} platform - Platform identifier.
 * @param {boolean} isOnline - Online flag.
 * @returns {Promise<object|null>}
 */
export const editAppSetting = async (id, platform, isOnline) => {
  const updated = await updateAppSetting(id, platform, isOnline);
  await clearCache();
  return updated;
};

/**
 * Delete an app setting and clear cache.
 * @param {number} id - AppSettings id.
 * @returns {Promise<number>}
 */
export const removeAppSetting = async (id) => {
  const affected = await deleteAppSetting(id);
  await clearCache();
  return affected;
};

/**
 * Find an app setting by id.
 * @param {number} id - AppSettings id.
 * @returns {Promise<object|null>}
 */
export const findAppSetting = async (id) => getAppSettingById(id);
