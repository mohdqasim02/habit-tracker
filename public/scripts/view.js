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
  #createCourseElement(course) {
    const courseBody = course.map(({ timeStamp, duration }, index) =>
      ['tr', [
        ['td', `Day-${index + 1}`],
        ['td', new Date(timeStamp).toLocaleString()],
        ['td', duration],
      ]]);

    const courseHead = generateComponent(['tr', [
      ['th', 'Day'],
      ['th', 'Timestamp'],
      ['th', 'Duration'],
    ]]);

    return [
      ['thead', courseHead],
      ['tbody', courseBody],
    ];
  }

  #createStreak(streaks) {
    const { start, end } = streaks.at(-1);
    const miliSecInDay = 1000 * 60 * 60 * 24;
    const timeDifference = (Date.parse(end) - Date.parse(start)) || 1;
    const streak = Math.ceil(timeDifference / miliSecInDay);

    return generateComponent(['div', `streak : ${streak}`]);
  }

  #createHabit({ course, streaks, activity, startDate }) {
    const article = generateComponent([
      'article', [
        ['div', `Activity : ${activity}`],
        ['div', `Start-date : ${new Date(startDate).toDateString()}`],
        ['table', this.#createCourseElement(course)],
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