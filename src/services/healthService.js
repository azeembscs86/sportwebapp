import { checkMysql, checkRedis } from "../repositories/healthRepository.js";

/**
 * Collect dependency health status for MySQL and Redis.
 * @returns {Promise<{status:string, dependencies:{mysql:string, redis:string}}>}
 */
export const getHealthStatus = async () => {
  const [mysql, redis] = await Promise.all([checkMysql(), checkRedis()]);

  return {
    status: "ok",
    dependencies: {
      mysql,
      redis
    }
  };
};
