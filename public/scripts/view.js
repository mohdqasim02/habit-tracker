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
  #createCourse(course) {
    const dayElement = document.createElement('tbody');

    dayElement.append(...course.map((day, index) =>
      generateComponent(['tr',
        [['td', `Day-${index + 1}`], ...Object.values(day).map(a => {
          if (typeof a === 'number' || typeof a === 'boolean') {
            return ['td', a];
          }

          return ['td', new Date(a).toUTCString()];
        })]
      ])));

    return dayElement;
  }

  #createStreak(streaks) {
    const { start, end } = streaks.at(-1);
    const streak = (Date.parse(start) - Date.parse(end)) / 1000 * 60 * 60 * 24;

    return generateComponent(['div', `streak : ${streak || 'going'}`]);
  }

  #createHabit({ course, streaks, activity, startDate }) {
    const article = generateComponent([
      'article', [
        ['div', `Activity : ${activity}`],
        ['div', `Start-date : ${new Date(startDate).toDateString()}`],
        ['table', this.#createCourse(course)],
        ['div', this.#createStreak(streaks)],
      ]
    ]);

    return article;
  }

  onNewEntry(cb) {
    const entryForm = document.querySelector('#entry-form');

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