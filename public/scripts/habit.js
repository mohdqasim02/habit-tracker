const parseActivity = () => {
  const [_, queryParams] = window.location.href.split('?');
  const habit = new URLSearchParams(queryParams);

  return habit.get('activity');
};

const main = () => {
  const activity = parseActivity();
  const userAgent = new UserAgent(new View());
  const title = document.querySelector('#activity-name');

  title.innerText = activity;
  userAgent.start(activity);
};

window.onload = main;