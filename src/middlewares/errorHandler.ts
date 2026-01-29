import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { logger } from "../utils/logger";

export const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
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
