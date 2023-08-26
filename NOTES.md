# Habit Tracker

What is a habit ?

{
  Activity: Reading,
  StartDate: 27 april 2023,
  Course: [day1, day2, day3],
  streaks: {
    1: [day1, day5], 
    2: [day7, day10], 
    3: [day12, day20],
    longest: streaks[3],
    current: streaks[2]
  }
}

What is a day ?

{
  timeStamp: Wednesday 10 May 2023,
  showedUp: yes / no,
  duration: 30 minutes,
  description,
}

What is streaks ?

{
  current: 6,
  largest: 30, 
}

What can be done with a habit ?

  - Add a habit
  - Track a habit
  - Remove a habit
  - Show progress of a habit
  - Show all activities that are being tracked


How to start Tracking ?

  - node main.js add "Jogging"
  - node main.js track "Reading" showedUp 20
  - node main.js track "Jogging" missed


How to see progress ?

  - node main.js showHabits

    "Running" 
    "Jogging"
    "Reading"

  - node main.js progress "Reading"

     Activity: Reading
     StartDate: 27 april 2023
     Streak: 10
     ShowedUp: 10
     Missed: 3
     Time: 260 mins
