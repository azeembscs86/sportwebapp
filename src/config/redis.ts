import { createClient } from "redis";
import { env } from "./env";
import { logger } from "../utils/logger";

export const redisClient = createClient({
  socket: {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT
  },
  password: env.REDIS_PASSWORD || undefined
});

redisClient.on("error", (error) => {
  logger.error("Redis client error", { error: error.message });
});

export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    logger.info("Redis connection established");
  }
};
