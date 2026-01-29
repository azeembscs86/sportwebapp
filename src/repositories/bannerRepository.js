import { mysqlPool } from "../config/database";
import { BannerModel } from "../models/bannerModel";

const mapRowToBanner = (row: any): BannerModel => ({
  bannerId: row.BannerId,
  bannerUrl: row.BannerUrl,
  isOnline: Boolean(row.IsOnline),
  createdDate: new Date(row.CreatedDate),
  updateDate: new Date(row.UpdateDate)
});

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

export const createBanner = async (bannerUrl: string, isOnline: boolean) => {
  const query = `
    INSERT INTO Banners (BannerUrl, IsOnline)
    VALUES (?, ?)
  `;

  const [result] = await mysqlPool.execute(query, [bannerUrl, isOnline ? 1 : 0]);
  const insertId = (result as any).insertId as number;
  return getBannerById(insertId);
};

export const updateBanner = async (
  bannerId: number,
  bannerUrl: string,
  isOnline: boolean
) => {
  const query = `
    UPDATE Banners
    SET BannerUrl = ?, IsOnline = ?
    WHERE BannerId = ?
  `;

  await mysqlPool.execute(query, [bannerUrl, isOnline ? 1 : 0, bannerId]);
  return getBannerById(bannerId);
};

export const deleteBanner = async (bannerId: number) => {
  const query = `
    DELETE FROM Banners
    WHERE BannerId = ?
  `;

  const [result] = await mysqlPool.execute(query, [bannerId]);
  return (result as any).affectedRows as number;
};

export const getBanners = async () => {
  const query = `
    SELECT BannerId, BannerUrl, IsOnline, CreatedDate, UpdateDate
    FROM Banners
    ORDER BY CreatedDate DESC
  `;

  const [rows] = await mysqlPool.query(query);
  return (rows as any[]).map(mapRowToBanner);
};

export const getOnlineBanners = async () => {
  const query = `
    SELECT BannerId, BannerUrl, IsOnline, CreatedDate, UpdateDate
    FROM Banners
    WHERE IsOnline = 1
    ORDER BY CreatedDate DESC
  `;

  const [rows] = await mysqlPool.query(query);
  return (rows as any[]).map(mapRowToBanner);
};

export const getBannerById = async (bannerId: number) => {
  const query = `
    SELECT BannerId, BannerUrl, IsOnline, CreatedDate, UpdateDate
    FROM Banners
    WHERE BannerId = ?
    LIMIT 1
  `;

  const [rows] = await mysqlPool.query(query, [bannerId]);
  const [row] = rows as any[];
  return row ? mapRowToBanner(row) : null;
};
