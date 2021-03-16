# Help and Statistics Pane Appearance on Screen

* Status: accepted
* Deciders: all members of the team
* Date: 03/09/2021

## Context and Problem Statement

We were deciding on how help and stats pane can appear on screen.

## Considered Options

* Only one pane may appear at a time
  - Opening one pane will close the other one in a sliding animation across screen
  - Help pane appears from the left
  - Statistics pane appears from the right 
* Both can appear simultaneously
  - Help pane appears from the left
  - Statistics pane appears from the right
  - Squeeze the timer in the middle

## Decision Outcome

Chosen option: One pane at a time, because

* Less clutter on screen
  - it is guaranteed that there will be ample space in the screen
* Clean transition for beautiful user interface
* Doesn't impact styling of other components

## Pros and Cons of Other Options

### Both can appear

* Pro: more information on the screen
* Pro: user can decide which pane they want to look at
* Con: clutters the screen, which increases user distraction
