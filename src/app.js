import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler.js";
import healthRoutes from "./routes/healthRoutes.js";
import echoRoutes from "./routes/echoRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import appSettingsRoutes from "./routes/appSettingsRoutes.js";
import { logger } from "./utils/logger.js";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim())
    }
  })
);

app.use(healthRoutes);
app.use("/api", echoRoutes);
app.use("/api", bannerRoutes);
app.use("/api", appSettingsRoutes);

app.use(errorHandler);

export default app;
