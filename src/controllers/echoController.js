/**
 * Handle request to echo back payload.
 */
export const echoRequest = (request, response) => {
  response.status(200).json({
    message: "Request accepted",
    payload: request.body
  });
};
