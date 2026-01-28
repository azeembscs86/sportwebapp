import { mysqlPool } from "../config/database";
import { redisClient } from "../config/redis";

export const checkMysql = async () => {
  const connection = await mysqlPool.getConnection();
  try {
    await connection.ping();
    return "up" as const;
  } finally {
    connection.release();
  }
};

export const checkRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }

  await redisClient.ping();
  return "up" as const;
};
