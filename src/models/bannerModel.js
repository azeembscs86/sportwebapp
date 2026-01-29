/**
 * Convert a raw Banner database row into a normalized object.
 * @param {object} row - Raw database row.
 * @returns {{bannerId:number, bannerUrl:string, isOnline:boolean, createdDate:Date, updateDate:Date}}
 */
export const mapRowToBanner = (row) => ({
  bannerId: row.BannerId,
  bannerUrl: row.BannerUrl,
  isOnline: Boolean(row.IsOnline),
  createdDate: new Date(row.CreatedDate),
  updateDate: new Date(row.UpdateDate)
});
