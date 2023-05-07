# Habit Tracker

A list of habits :

- Running
- Weight Lifting
- Reading


A habit:

- StartDate
- Streak
- ShowedUp days count
- Missed days count
- Total Time performed minutes


This utility will have four functionality:

- Add a habit
- Track a habit
- Show progress of a habit
- Show all habits that are being tracked


How to start Tracking ?

- node main.js add "Jogging" "07 may 2023"
- node main.js track "Reading" "performed/showedUp" 20
- node main.js track "Jogging" "missed"


How to see progress ?

- node main.js activities

```

  Running 
  Jogging
  Reading

```

- node main.js progress Reading

```

  Activity: Reading
  StartDate: 27 april 2023
  Streak: 10 (days)
  ShowedUp: 10 (days)
  Missed: 3 (days)
  Time: 260 (minutes)

```
