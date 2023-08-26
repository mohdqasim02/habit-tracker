const main = () => {
  const view = new View();
  const userAgent = new UserAgent(view);

  userAgent.start();
};

window.onload = main;