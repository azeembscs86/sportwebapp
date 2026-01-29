/**
 * Validate request params/body/query using a Zod schema.
 * @param {object} schema - Zod schema.
 * @returns {(request: object, response: object, next: Function) => void}
 */
export const validateRequest = (schema) => (request, _response, next) => {
  schema.parse({
    body: request.body,
    query: request.query,
    params: request.params
  });

  next();
};
