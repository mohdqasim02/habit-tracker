class UserAgent {
  #view;
  #habits;
  #activity;

  constructor(view, activity, habits = []) {
    this.#view = view;
    this.#habits = habits;
    this.#activity = activity;
  }

  #getHabitAndRender() {
    fetch(`/habits/${this.#activity}`)
      .then(res => res.json())
      .catch(err => console.error(err.message))
      .then(habits => this.#view.render(habits));
  };

  #onNewEntry(log) {
    fetch(`/habits/${this.#activity}`, {
      method: 'POST',
      body: JSON.stringify(log),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(_ => this.#getHabitAndRender());
  }

  start() {
    this.#getHabitAndRender();
    this.#view.onNewEntry((log) => this.#onNewEntry(log));
  }
}
