import { env } from "../config/env.js";

const levels = ["error", "warn", "info", "debug"];

const levelIndex = levels.indexOf(env.LOG_LEVEL);

/**
 * Determine whether a log level should be emitted.
 * @param {string} level - Log level.
 * @returns {boolean}
 */
const shouldLog = (level) => levels.indexOf(level) <= levelIndex;

/**
 * Format a log message as JSON.
 * @param {string} level - Log level.
 * @param {string} message - Log message.
 * @param {unknown} meta - Optional metadata.
 * @returns {string}
 */
const formatMessage = (level, message, meta) => {
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

/**
 * Structured logger with leveled output.
 */
export const logger = {
  /**
   * Log an error message.
   * @param {string} message - Log message.
   * @param {unknown} meta - Optional metadata.
   */
  error: (message, meta) => {
    if (shouldLog("error")) {
      console.error(formatMessage("error", message, meta));
    }
  },
  /**
   * Log a warning message.
   * @param {string} message - Log message.
   * @param {unknown} meta - Optional metadata.
   */
  warn: (message, meta) => {
    if (shouldLog("warn")) {
      console.warn(formatMessage("warn", message, meta));
    }
  },
  /**
   * Log an info message.
   * @param {string} message - Log message.
   * @param {unknown} meta - Optional metadata.
   */
  info: (message, meta) => {
    if (shouldLog("info")) {
      console.info(formatMessage("info", message, meta));
    }
  },
  /**
   * Log a debug message.
   * @param {string} message - Log message.
   * @param {unknown} meta - Optional metadata.
   */
  debug: (message, meta) => {
    if (shouldLog("debug")) {
      console.debug(formatMessage("debug", message, meta));
    }
  }
};
