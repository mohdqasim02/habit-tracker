const logRequest = (req, _, next) => {
  console.log({
    method: req.method,
    url: req.url,
  });
  next();
};

module.exports = {
  logRequest
};
