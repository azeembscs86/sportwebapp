import { Request, Response, NextFunction } from "express";
import { getHealthStatus } from "../services/healthService";

export const healthCheck = async (
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const status = await getHealthStatus();
    response.status(200).json(status);
  } catch (error) {
    next(error);
  }
};
