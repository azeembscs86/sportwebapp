import { ZodError } from "zod";
import { logger } from "../utils/logger.js";

/**
 * Centralized error handler for API responses.
 * @param {Error} error - Thrown error.
 * @param {object} _request - Express request.
 * @param {object} response - Express response.
 * @param {Function} _next - Express next callback.
 */
export const errorHandler = (error, _request, response, _next) => {
  if (error instanceof ZodError) {
    logger.warn("Validation error", { issues: error.issues });
    return response.status(400).json({
      message: "Validation failed",
      errors: error.issues
    });
  }

  logger.error("Unhandled error", { message: error.message });
  return response.status(500).json({
    message: "Internal server error"
  });
};
