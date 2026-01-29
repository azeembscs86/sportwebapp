import app from "./app";
import { env } from "./config/env";
import { connectRedis } from "./config/redis";
import { validateMysqlConnection } from "./config/database";
import { logger } from "./utils/logger";
import { ensureBannerTable } from "./services/bannerService";

const startServer = async () => {
  try {
    await validateMysqlConnection();
    await connectRedis();
    await ensureBannerTable();

    app.listen(env.PORT, () => {
      logger.info(`Server listening on port ${env.PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start server", { error });
    process.exit(1);
  }
};

startServer();
