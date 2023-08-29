const parseCookies = (req, _, next) => {
  if (!req.headers.cookie) {
    req.cookies = {};
    next();
    return;
  }

  const { cookie } = req.headers;
  const keyValuePairs = cookie.split('; ').map((kv) => kv.split('='));

  req.cookies = Object.fromEntries(keyValuePairs);
  next();
};

module.exports = { parseCookies };