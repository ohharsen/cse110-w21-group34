# Limited User Interaction With Timer

## Context and Problem Statement

We were deciding how engaged the user needs to be while the timer is running. This is a core implementation decision that must be in line with the Pomodoro concept. Otherwise, it may defeat the purpose of preventing distractions and encouraging productivity. 

## Considered Options

* Have timer visible in large font, updating every second
* Have timer visible in small font, updating every second
* Make timer invisible
* Make timer invisible with a button to flash timer for 5 seconds 
* Make timer update elsewhere on the screen so to be visible from other tabs

## Decision Outcome

We chose option 4. Our goal is to limit user interaction with the app because were the user to spend time checking how much time they have left, it would decrase their productivity and break their focus. However, people tend to get impatient as the clock winds down, which is why we decided to add a button that would allow the user to view the timer. This extra hurdle would hopefully ensure that users are not spending too much time simply counting down the timer. 

## Pros and Cons of the other Options

### Option 1: Have timer visible in large font, updating every second

* Good, provides information to the user
* Bad, runs the risk of the user focusing too much on the timer

### Option 2: Have timer visible in small font, updating every second

* Good, provides information to the user
* Bad, runs same risk of user focusing too much on timer as option 1

### Option 3: Make timer invisible

* Good, no risk of distraction induced by timer
* Bad, restlessness and frustration can occur, causing user to stop using product entirely

### Option 5: Make timer update elsewhere on the screen so to be visible from other tabs

* Good, user doesn't have to visit timer page to see timer
* Bad, constant updating is non-trivial
* Bad, user can still be distracted by looking at the timer