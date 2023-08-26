const generateComponent = ([tagName, children, attributes = {}]) => {
  const element = document.createElement(tagName);

  Object.entries(attributes)
    .forEach(attribute => element.setAttribute(...attribute));

  if (Array.isArray(children)) {
    element.append(...children.map(child => generateComponent(child)));
    return element;
  }

  if (typeof children === 'object') element.innerHTML = children.innerHTML;
  else element.innerText = children;

  return element;
};

class View {
  #addIcon;
  #listeners;

  constructor() {
    this.#listeners = {};
    this.#addIcon = document.querySelector('#add-icon');
  }

  on(event, listener) {
    this.#listeners[event] = listener;
  }

  onAddHabit(cb) {
    const newHabitForm = document.querySelector('#start-habit');
    const activityInput = document.querySelector('#activity-name');

    newHabitForm.onsubmit = (event) => {
      event.preventDefault();

      if (activityInput.value !== '')
        cb(activityInput.value);
      activityInput.value = '';
    };
  }

  #createHabit({ course, streaks, activity, startDate }) {
    const article = generateComponent([
      'article', [
        ["div", course],
        ["div", streaks],
        ["div", activity],
        ["div", startDate],
      ]
    ]);

    return article;
  }

  render(habits) {
    const habitsBox = document.querySelector('#habits');

    [...habitsBox.children].forEach(child => child.remove());
    habits.forEach(habit => habitsBox.append(this.#createHabit(habit)));
  }
}