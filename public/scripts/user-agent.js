class UserAgent {
  #view;
  #habits;

  constructor(view, habits = []) {
    this.#view = view;
    this.#habits = habits;
  }

  #getHabitsAndRender() {
    fetch('/habits')
      .then(res => res.json())
      .catch(err => console.error(err.message))
      .then(habits => this.#view.render(habits));
  };

  #addHabit(activity) {
    fetch('/habits', {
      method: 'post',
      body: JSON.stringify({ activity }),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(_ => this.#getHabitsAndRender());
  }

  start() {
    this.#getHabitsAndRender();
    this.#view.onAddHabit((activity) => this.#addHabit(activity));
  }
}
