const authenticate = (req, res, next) => {
  const { users } = req.app.context;
  const { name, password } = req.cookies;

  if (users.isValid({ name, password })) {
    req.app.context.habits = users.getHabits({ name, password });
    next();
    return;
  }

  res.redirect(303, '/login');
};

const loginPage = (req, res) => {
  const { users } = req.app.context;
  const { name, password } = req.cookies;

  if (users.isValid({ name, password })) {
    res.redirect(303, '/index.html');
    return;
  }

  res.sendFile('/pages/login.html', {
    root: 'public'
  });
};

const login = (req, res) => {
  const { users } = req.app.context;
  const { name, password } = req.body;

  if (users.isValid({ name, password })) {
    res.cookie('name', name);
    res.cookie('password', password);
    res.redirect(303, '/');
    return;
  }

  res.redirect(303, '/signup');
};

const signupPage = (req, res) => {
  const { users } = req.app.context;
  const { name, password } = req.cookies;

  if (users.isValid({ name, password })) {
    res.redirect(303, '/login');
    return;
  }

  res.sendFile('/pages/signup.html', {
    root: 'public'
  });
};

const signup = (req, res) => {
  const { users, storage } = req.app.context;
  const { name, password } = req.body;

  if (!users.isValid({ name, password })) {
    users.add({ name, password });
  }

  storage.write(users.usersData, () => {
    res.cookie('name', name);
    res.cookie('password', password);
    res.redirect(303, '/');
  });
};

module.exports = {
  authenticate,
  signupPage,
  loginPage,
  signup,
  login
};