import { getHealthStatus } from "../services/healthService.js";

/**
 * Handle request for system health check.
 */
export const healthCheck = async (
  _request,
  response,
  next
) => {
  try {
    const status = await getHealthStatus();
    response.status(200).json(status);
  } catch (error) {
    next(error);
  }
};
