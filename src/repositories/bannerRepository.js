import { mysqlPool } from "../config/database.js";
import { mapRowToBanner } from "../models/bannerModel.js";

/**
 * Ensure the Banners table exists in MySQL.
 * @returns {Promise<void>}
 */
export const createBannerTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS Banners (
      BannerId INT AUTO_INCREMENT PRIMARY KEY,
      BannerUrl VARCHAR(500) NOT NULL,
      IsOnline TINYINT(1) NOT NULL DEFAULT 0,
      CreatedDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UpdateDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  await mysqlPool.execute(query);
};

/**
 * Insert a new banner record.
 * @param {string} bannerUrl - Banner URL.
 * @param {boolean} isOnline - Online flag.
 * @returns {Promise<object|null>}
 */
export const createBanner = async (bannerUrl, isOnline) => {
  const query = `
    INSERT INTO Banners (BannerUrl, IsOnline)
    VALUES (?, ?)
  `;

  const [result] = await mysqlPool.execute(query, [bannerUrl, isOnline ? 1 : 0]);
  const insertId = result.insertId;
  return getBannerById(insertId);
};

/**
 * Update an existing banner record.
 * @param {number} bannerId - Banner id.
 * @param {string} bannerUrl - Banner URL.
 * @param {boolean} isOnline - Online flag.
 * @returns {Promise<object|null>}
 */
export const updateBanner = async (bannerId, bannerUrl, isOnline) => {
  const query = `
    UPDATE Banners
    SET BannerUrl = ?, IsOnline = ?
    WHERE BannerId = ?
  `;

  await mysqlPool.execute(query, [bannerUrl, isOnline ? 1 : 0, bannerId]);
  return getBannerById(bannerId);
};

/**
 * Delete a banner record.
 * @param {number} bannerId - Banner id.
 * @returns {Promise<number>}
 */
export const deleteBanner = async (bannerId) => {
  const query = `
    DELETE FROM Banners
    WHERE BannerId = ?
  `;

  const [result] = await mysqlPool.execute(query, [bannerId]);
  return result.affectedRows;
};

/**
 * Fetch all banners.
 * @returns {Promise<object[]>}
 */
export const getBanners = async () => {
  const query = `
    SELECT BannerId, BannerUrl, IsOnline, CreatedDate, UpdateDate
    FROM Banners
    ORDER BY CreatedDate DESC
  `;

  const [rows] = await mysqlPool.query(query);
  return rows.map(mapRowToBanner);
};

/**
 * Fetch only online banners.
 * @returns {Promise<object[]>}
 */
export const getOnlineBanners = async () => {
  const query = `
    SELECT BannerId, BannerUrl, IsOnline, CreatedDate, UpdateDate
    FROM Banners
    WHERE IsOnline = 1
    ORDER BY CreatedDate DESC
  `;

  const [rows] = await mysqlPool.query(query);
  return rows.map(mapRowToBanner);
};

/**
 * Fetch a single banner by id.
 * @param {number} bannerId - Banner id.
 * @returns {Promise<object|null>}
 */
export const getBannerById = async (bannerId) => {
  const query = `
    SELECT BannerId, BannerUrl, IsOnline, CreatedDate, UpdateDate
    FROM Banners
    WHERE BannerId = ?
    LIMIT 1
  `;

  const [rows] = await mysqlPool.query(query, [bannerId]);
  const [row] = rows;
  return row ? mapRowToBanner(row) : null;
};
