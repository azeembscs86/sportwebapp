import { mysqlPool } from "../config/database.js";
import { mapRowToAppSettings } from "../models/appSettingsModel.js";

/**
 * Ensure the AppSettings table exists in MySQL.
 * @returns {Promise<void>}
 */
export const createAppSettingsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS AppSettings (
      Id INT AUTO_INCREMENT PRIMARY KEY,
      Platform VARCHAR(100) NOT NULL,
      IsOnline TINYINT(1) NOT NULL DEFAULT 0,
      CreateDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UpdateDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  await mysqlPool.execute(query);
};

/**
 * Insert a new AppSettings record.
 * @param {string} platform - Platform identifier.
 * @param {boolean} isOnline - Online flag.
 * @returns {Promise<object|null>}
 */
export const createAppSetting = async (platform, isOnline) => {
  const query = `
    INSERT INTO AppSettings (Platform, IsOnline)
    VALUES (?, ?)
  `;

  const [result] = await mysqlPool.execute(query, [platform, isOnline ? 1 : 0]);
  const insertId = result.insertId;
  return getAppSettingById(insertId);
};

/**
 * Update an existing AppSettings record.
 * @param {number} id - AppSettings id.
 * @param {string} platform - Platform identifier.
 * @param {boolean} isOnline - Online flag.
 * @returns {Promise<object|null>}
 */
export const updateAppSetting = async (id, platform, isOnline) => {
  const query = `
    UPDATE AppSettings
    SET Platform = ?, IsOnline = ?
    WHERE Id = ?
  `;

  await mysqlPool.execute(query, [platform, isOnline ? 1 : 0, id]);
  return getAppSettingById(id);
};

/**
 * Delete an AppSettings record.
 * @param {number} id - AppSettings id.
 * @returns {Promise<number>}
 */
export const deleteAppSetting = async (id) => {
  const query = `
    DELETE FROM AppSettings
    WHERE Id = ?
  `;

  const [result] = await mysqlPool.execute(query, [id]);
  return result.affectedRows;
};

/**
 * Fetch all AppSettings records.
 * @returns {Promise<object[]>}
 */
export const getAppSettings = async () => {
  const query = `
    SELECT Id, Platform, IsOnline, CreateDate, UpdateDate
    FROM AppSettings
    ORDER BY CreateDate DESC
  `;

  const [rows] = await mysqlPool.query(query);
  return rows.map(mapRowToAppSettings);
};

/**
 * Fetch a single AppSettings record by id.
 * @param {number} id - AppSettings id.
 * @returns {Promise<object|null>}
 */
export const getAppSettingById = async (id) => {
  const query = `
    SELECT Id, Platform, IsOnline, CreateDate, UpdateDate
    FROM AppSettings
    WHERE Id = ?
    LIMIT 1
  `;

  const [rows] = await mysqlPool.query(query, [id]);
  const [row] = rows;
  return row ? mapRowToAppSettings(row) : null;
};
