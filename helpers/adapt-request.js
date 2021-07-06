module.exports = function adaptRequest(req = {}) {
  const request = {
    path: req.path,
    method: req.method,
    pathParams: req.params,
    queryParams: req.query,
    body: req.body,
  };

  console.log("Handle", request);

  return Object.freeze(request);
};
