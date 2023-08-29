const generateComponent = ([tagName, children, attributes = {}]) => {
  const element = document.createElement(tagName);

  Object.entries(attributes)
    .forEach(attribute => element.setAttribute(...attribute));

  if (Array.isArray(children)) {
    element.append(...children.map(child => generateComponent(child)));
    return element;
  }

  if (typeof children === 'object') {
    element.innerHTML = children.innerHTML;
    return element;
  }

  element.innerText = children;
  return element;
};

class View {
  #createCourseHead() {
    return generateComponent(['tr', [
      ['th', 'Practice'],
      ['th', 'Timestamp'],
      ['th', 'Duration'],
    ]]);
  }

  #createCourseBody(course) {
    return course.map(({ timeStamp, duration }, index) =>
      ['tr', [
        ['td', `${index + 1}`],
        ['td', new Date(timeStamp).toLocaleString()],
        ['td', duration],
      ]]);
  }

  #createStreak(streaks) {
    const { start, end } = streaks.at(-1) || {};
    const miliSecInDay = 1000 * 60 * 60 * 24;
    const timeDifference = (Date.parse(end) - Date.parse(start)) || 0;
    const streak = Math.ceil(timeDifference / miliSecInDay);

    return generateComponent(['div', `streak : ${streak}`]);
  }

  #createHabit({ course, streaks, activity, startDate }) {
    const article = generateComponent([
      'article', [
        ['div', `Activity : ${activity}`],
        ['div', `Start-date : ${new Date(startDate).toDateString()}`],
        ['table', [
          ['thead', this.#createCourseHead()],
          ['tbody', this.#createCourseBody(course)]
        ]],
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
      const duration = parseInt(formData.get('duration') || 0);
      const presence = duration > 0;

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