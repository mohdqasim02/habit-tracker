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
  #createHabit({ course, streaks, activity, startDate }) {
    const article = generateComponent([
      'article', [
        ['div', JSON.stringify(course)],
        ['div', JSON.stringify(streaks)],
        ['div', JSON.stringify(activity)],
        ['div', JSON.stringify(startDate)],
      ]
    ]);

    return article;
  }

  onNewEntry(cb) {
    const entryForm = document.querySelector('#entry-from');

    entryForm.onsubmit = (event) => {
      event.preventDefault();

      const formData = new FormData(entryForm);
      const presence = formData.get('presence') === 'on';
      const duration = parseInt(formData.get('duration'));

      cb({ duration, presence });
      entryForm.reset();
    };
  }

  render(habit) {
    const habitsBox = document.querySelector('#habit');

    [...habitsBox.children].forEach(child => child.remove());
    habitsBox.append(this.#createHabit(habit));
  }
}