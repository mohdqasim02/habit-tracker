const createHabit = (habit) => {
  const habitAnchor = document.createElement('a');

  habitAnchor.innerText = habit;
  habitAnchor.setAttribute('href', `/habits/pages/${habit}`);

  return habitAnchor;
}

const render = (habits) => {
  const habitsBox = document.querySelector('#habits');

  [...habitsBox.children].forEach(child => child.remove());
  habits.forEach(habit => habitsBox.append(createHabit(habit)));
}

const postHabit = (activity) => {
  fetch('/habits', {
    method: 'post',
    body: JSON.stringify({ activity }),
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then(_ => getHabitsAndRender());
}

const setupAddHabit = () => {
  const newHabitForm = document.querySelector('#start-habit');
  const activityInput = document.querySelector('#activity-name');

  newHabitForm.onsubmit = (event) => {
    event.preventDefault();

    if (activityInput.value !== '')
      postHabit(activityInput.value);
    activityInput.value = '';
  };
}

const getHabitsAndRender = () => {
  fetch('/habits')
    .then(res => res.json())
    .catch(err => console.error(err.message))
    .then(habits => render(habits));
};

const main = () => {
  setupAddHabit();
  getHabitsAndRender();
};

window.onload = main;