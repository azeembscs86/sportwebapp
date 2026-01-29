import app from "./app.js";
import { env } from "./config/env.js";
import { connectRedis } from "./config/redis.js";
import { validateMysqlConnection } from "./config/database.js";
import { logger } from "./utils/logger.js";
import { ensureBannerTable } from "./services/bannerService.js";
import { ensureAppSettingsTable } from "./services/appSettingsService.js";

const startServer = async () => {
  try {
    await validateMysqlConnection();
    await connectRedis();
    await ensureBannerTable();
    await ensureAppSettingsTable();

    app.listen(env.PORT, () => {
      logger.info(`Server listening on port ${env.PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start server", { error });
    process.exit(1);
  }
};

startServer();
