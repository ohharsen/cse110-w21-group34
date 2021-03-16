# Timer Animation Design

* Status: accepted
* Deciders: all members of the team
* Date: 02/22/2021

## Context and Problem Statement

We were deciding on how to implement the timer animation.

## Considered Options

* Curved linear transition
  - Smooth continuous change
  - Calculate length using fraction of time remaining
* Bit by bit decrement
  - Linear decrement
  - Count down from total to zero

## Decision Outcome

Chosen option: Curved linear transition, because

* Provides continuous animation for timer counting down
* Utilizes calculating the fraction of how much time remains, can be scaled to different lengths of time

## Pros and Cons of Other Options

### Bit by bit decrement

* Pro: simpler, easier to implement
  - less code to write, easier to interpret when testing and reviewing
* Con: more rigid design, animation not smooth
  - doesn't fit out choices for having a clean user interface
