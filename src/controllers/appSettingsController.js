import {
  addAppSetting,
  editAppSetting,
  findAppSetting,
  listAppSettings,
  removeAppSetting
} from "../services/appSettingsService.js";

/**
 * Handle request to list all app settings.
 */
export const getAppSettings = async (_request, response, next) => {
  try {
    const settings = await listAppSettings();
    response.status(200).json(settings);
  } catch (error) {
    next(error);
  }
};

/**
 * Handle request to fetch a single app setting by id.
 */
export const getAppSettingById = async (request, response, next) => {
  try {
    const { id } = request.params;
    const setting = await findAppSetting(Number(id));
    if (!setting) {
      return response.status(404).json({ message: "App setting not found" });
    }
    response.status(200).json(setting);
  } catch (error) {
    next(error);
  }
};

/**
 * Handle request to create a new app setting.
 */
export const createAppSetting = async (request, response, next) => {
  try {
    const { platform, isOnline } = request.body;
    const created = await addAppSetting(platform, isOnline);
    response.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

/**
 * Handle request to update an app setting.
 */
export const updateAppSetting = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { platform, isOnline } = request.body;
    const updated = await editAppSetting(Number(id), platform, isOnline);
    if (!updated) {
      return response.status(404).json({ message: "App setting not found" });
    }
    response.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

/**
 * Handle request to delete an app setting.
 */
export const deleteAppSetting = async (request, response, next) => {
  try {
    const { id } = request.params;
    const affected = await removeAppSetting(Number(id));
    if (affected === 0) {
      return response.status(404).json({ message: "App setting not found" });
    }
    response.status(204).send();
  } catch (error) {
    next(error);
  }
};
