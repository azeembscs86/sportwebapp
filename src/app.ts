import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler";
import healthRoutes from "./routes/healthRoutes";
import echoRoutes from "./routes/echoRoutes";
import { logger } from "./utils/logger";

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

app.use(errorHandler);

export default app;
