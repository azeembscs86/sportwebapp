import { checkMysql, checkRedis } from "../repositories/healthRepository";

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
