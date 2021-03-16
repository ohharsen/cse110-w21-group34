# Hover or Click for Panes

* Status: accepted
* Deciders: all members of the team
* Date: 03/09/2021

## Context and Problem Statement

We were deciding on whether to use click or hover for showing panes.

## Considered Options

* Click
  - Panes will come out on click
  - Panes will be closed on second click
* Hover
  - Panes will come out on hover
  - Panes will be closed off hover

## Decision Outcome

Chosen option: Click, because

* More intuitive for user
  - when given a button, it is natural to click it, not to hover over it
* Simpler design for user interaction
  - using an event listener for click simplifies the coding process
  - easier to test
* Clean transition for pane to enter and exit screen

## Pros and Cons of Other Options

### Hover

* Pro: Gives user another viewing option
* Con: Annoying in situations where the user doesn't want to view the pane but accidentally hovers over it
* Con: Hovering is less intuitive for user
  - clicking a button makes more sense
* Con: doesn't work for mobile users
