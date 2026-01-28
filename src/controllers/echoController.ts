import { Request, Response } from "express";

export const echoRequest = (request: Request, response: Response) => {
  response.status(200).json({
    message: "Request accepted",
    payload: request.body
  });
};
