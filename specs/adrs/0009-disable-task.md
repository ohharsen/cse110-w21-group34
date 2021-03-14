# Disable Task Button

* Status: accepted
* Deciders: all members of the team
* Date: 03/01/2021

## Context and Problem Statement

We were deciding on whether task button should be disabled in certain scenarios.

## Considered Options

* Disabled unless timer is finished
  - User can only complete a task when cycle completes
* Disabled after one click
  - User can only complete one task per cycle
* Enabled at all times
  - User can always complete a task

## Decision Outcome

Chosen option: Disabled unless timer is finished, because

* Following pomodoro standards, task may only be completed when timer is not running
* Less user distraction
* Code implementation is simpler

Pros and Cons of Other Options

Disabled after one click

* Pro: only one task can be completed at a time 
* Con: minimal user flexibility
* Con: doesn't follow pomodoro standards

Enabled

* Pro: more user flexibility
* Pro: user can finish multiple tasks per cycle
* Con: doesn't follow pomodoro standards
