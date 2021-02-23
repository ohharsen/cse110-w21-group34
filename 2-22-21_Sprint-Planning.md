- Topic: Planning Sprint 3 and Beyond
- Date: 2/22/21
- Time: 5:00pm (Monday)
- Location: Zoom (Online)
- Written by: Michael Brown
- Attendance: 9/9

# Overview
- Group meeting heavily focused on discussion of new issues
- Delving further into steps beyond the MVP, describing what we need to fix (bugs, improvements, etc.)
- Establishing timeline / weekly coverage over new tasks
- Delegation of roles to all members

---------

# New / Upcoming Issues for Sprint 3 and Beyond

## Populating Statistics Page
```
- Populating graph display with data
- Will probably utilze a 3rd party
- Will take more time to complete

- Is a very specific issue, yet a very monster task
  * Need to break into more modular issues

- Additional Data
  * # pomos, interruptions tasks per day
  * All as numbers, NOT ratios
```

## Extracting Data from Timer
```
- Elapsed time
  * Retrieving time directly from clock
  * Starting from 25:00; subtract from it the time stamp of which 'reset' was clicked

- # Pomos completed
- Tasks completed
- Proportion of completed pomos
- # Time reset button hit
- # Interruptions
  * Measured as ratio of total pomos
```

## User stats and data Persistence
```
- Considering localStorage API
- Data held between sessions
- Data persists through leaving/re-opening app
```

## Stats Front-end feature
```
- Secondary focus to improve, update button animation/transition when opening stats page
```


## Timer - 1 second delay
```
- Design bug / enhancement

- Additional issue: "timer display black hole-ness"
  * issue with timer; perhaps attributed to merging, TODO immediately
```

## Pomodoro Counter
```
- Show user which Pomodoro they're on for the specific task
```

## Disable the complete-task button
```
- Period between start of break and end of pomo
- By professor's logic
  * Complete task is clickable once per work cycle
```

## Start/Reset
```
- When user stops pomo before its completion, update distraction count
- Update local storage once button pressed
```

## Stretch Goal - Text Prompt
```
- Prompting user a yes/no statement "Do you want to go back to start of cycle?"
  * Prompt aler/text bubble
  * Tell that it will count as a distraction
```

## Notifications
```
- Audio cue
  * "ding" sound effect
- Visual cue
  * Popup message on screen

- Message dependent on what part of cycle you are on (break or work cycle)
```

## Code Cleanup and Testing
```
- Technical Debt, DO NOT leave alone until the end of quarter (prevent stack-up of messy code)
- Modularizing code into separate files for clarity
- Each header to be split into separate files

- Specify labels per variable + proper commenting
  * Should be a collective process among everyone

- Testing
  * Create a local storage mock
```

----------

# Urgent Work (Closing Reminders)
```
- Linting
- Timer Visual Bug
- Modularizing code
- Code cleanup
- Team Status Video
```

----------

## Week 8

```
- task button, break apart local storage function

- notifications on timer complete

- start/reset - distraction timer

- Task button - review and testing
```

## Week 9
```
- More testintg

- Creationg of local storage\

- Any remaining issues/bugs from previous week

- More to be further disclosed as time progresses
```

----------
# Role Asignment

## Stats
```
a. Main tasks
  - calculate total statistics
  - calculate daily stats
  - extract/organize data from timer

Assignees - Ved, Josh, Michal K.
```

## Task Button
```
a. TAsk button
- Review, redo tasks
- Break apart loca storage function

Assignees - William, Viren
```

## Timer
```
a. Black hole-ness and other features
  - Visual bug

b. Further updates
  - Window resizing
  - Fading effects

Assignees -  Michael, Keshab
```
## Pomos
```
a. Pomodoro counter
  - Connect to task button onpress

Assignee - Amy
```

## Linting
```
a. Code cleanup

Assignee - Arsen
```
