# Allow Reset on Break

* Status: accepted
* Deciders: all members of the team
* Date: 02/16/2021

## Context and Problem Statement

We were deciding whether we wanted to keep the reset timer functionality for a break.

## Considered Options

* Allow reset timer when user is on a break
  - resetting will count as a distraction
* Disable reset timer when user is on break
  - grey out the button, cannot be clicked

## Decision Outcome

Chosen option: disable reset timer, because

* Less distractions because there is less user interaction
  - User has less choices which leads to less user interaction
* Matches our intended design for tracking distractions

## Pros and Cons of Other Options

### Allow reset timer

* Pro: gives user more flexibility in using the timer to fit their needs
* Con: more distractions for the user
* Con: resetting on break is not an intended feature
