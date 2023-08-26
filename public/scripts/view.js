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

  #createHabit({ course, streaks, activity, startDate }) {
    const article = generateComponent([
      'article', [
        ['div', course],
        ['div', streaks],
        ['div', activity],
        ['div', startDate],
      ]
    ]);

    return article;
  }

  render(habit) {
    console.log(habit);
    const habitsBox = document.querySelector('#habit');

    [...habitsBox.children].forEach(child => child.remove());
    habitsBox.append(this.#createHabit(habit));
  }
}