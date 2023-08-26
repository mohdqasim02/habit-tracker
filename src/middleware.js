const logRequest = (req, _, next) => {
  console.log({
    method: req.method,
    url: req.url,
    body: req.body,
    params: req.params
  });
  next();
};

module.exports = {
  logRequest
};
