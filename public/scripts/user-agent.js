class UserAgent {
  #view;
  #habits;

  constructor(view, habits = []) {
    this.#view = view;
    this.#habits = habits;
  }

  #getHabitAndRender(activity) {
    fetch(`/habits/${activity}`)
      .then(res => res.json())
      .catch(err => console.error(err.message))
      .then(habits => this.#view.render(habits));
  };

  start(activity) {
    this.#getHabitAndRender(activity);
  }
}
