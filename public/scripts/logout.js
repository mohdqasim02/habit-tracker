const setupLogout = () => {
  const logoutBtn = document.querySelector('#logout-btn');

  logoutBtn.onclick = () => {
    fetch('/logout', { method: 'post' })
      .then(_ => window.location.reload());
  };
};

const greetUser = () => {
  const username = document.querySelector('#username');

  fetch('/username')
    .then(res => res.json())
    .then(({ name }) => username.innerText = name);
};