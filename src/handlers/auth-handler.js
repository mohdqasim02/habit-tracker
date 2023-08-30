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

const logout = (req, res) => {
  res.cookie('name', { maxAge: -1 });
  res.cookie('password', { maxAge: -1 });
  res.end();
};

const username = (req, res) => {
  const { name } = req.cookies;
  res.send({ name });
};

module.exports = {
  login,
  signup,
  logout,
  username,
  authenticate,
};