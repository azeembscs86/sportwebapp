import { mysqlPool } from "../config/database.js";
import { redisClient } from "../config/redis.js";

/**
 * Ping MySQL to verify connectivity.
 * @returns {Promise<"up">}
 */
export const checkMysql = async () => {
  const connection = await mysqlPool.getConnection();
  try {
    await connection.ping();
    return "up" as const;
  } finally {
    connection.release();
  }
};

/**
 * Ping Redis to verify connectivity.
 * @returns {Promise<"up">}
 */
export const checkRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }

  await redisClient.ping();
  return "up" as const;
};
