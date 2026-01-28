import { env } from "../config/env";

const levels = ["error", "warn", "info", "debug"] as const;
type LogLevel = (typeof levels)[number];

const levelIndex = levels.indexOf(env.LOG_LEVEL as LogLevel);

const shouldLog = (level: LogLevel) => levels.indexOf(level) <= levelIndex;

const formatMessage = (level: LogLevel, message: string, meta?: unknown) => {
  const base = {
    level,
    message,
    timestamp: new Date().toISOString()
  };

  if (meta) {
    return JSON.stringify({ ...base, meta });
  }

  return JSON.stringify(base);
};

export const logger = {
  error: (message: string, meta?: unknown) => {
    if (shouldLog("error")) {
      console.error(formatMessage("error", message, meta));
    }
  },
  warn: (message: string, meta?: unknown) => {
    if (shouldLog("warn")) {
      console.warn(formatMessage("warn", message, meta));
    }
  },
  info: (message: string, meta?: unknown) => {
    if (shouldLog("info")) {
      console.info(formatMessage("info", message, meta));
    }
  },
  debug: (message: string, meta?: unknown) => {
    if (shouldLog("debug")) {
      console.debug(formatMessage("debug", message, meta));
    }
  }
};
