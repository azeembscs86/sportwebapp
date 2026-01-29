/**
 * Convert a raw AppSettings database row into a normalized object.
 * @param {object} row - Raw database row.
 * @returns {{id:number, platform:string, isOnline:boolean, createDate:Date, updateDate:Date}}
 */
export const mapRowToAppSettings = (row) => ({
  id: row.Id,
  platform: row.Platform,
  isOnline: Boolean(row.IsOnline),
  createDate: new Date(row.CreateDate),
  updateDate: new Date(row.UpdateDate)
});
