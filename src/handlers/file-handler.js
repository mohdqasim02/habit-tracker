const loginPage = (req, res) => {
  const { users } = req.app.context;
  const { name, password } = req.cookies;

  if (users.isValid({ name, password })) {
    res.redirect(303, '/index.html');
    return;
  }

  res.sendFile('/pages/login.html', {
    root: 'private'
  });
};

const signupPage = (req, res) => {
  const { users } = req.app.context;
  const { name, password } = req.cookies;

  if (users.isValid({ name, password })) {
    res.redirect(303, '/login');
    return;
  }

  res.sendFile('/pages/signup.html', {
    root: 'private'
  });
};

module.exports = {
  loginPage,
  signupPage
};