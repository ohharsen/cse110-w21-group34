# Broad Problem Focus

* Status: accepted
* Deciders: all members of the team
* Date: 02/22/2021

## Context and Problem Statement

We were deciding on how to implement the timer animation.

## Considered Options

* Curved linear transition
* Bit by bit decrement

## Decision Outcome

Chosen option: Curved linear transition, because

* Provides continuous animation for timer counting down
* Utilizes calculating the fraction of how much time remains, can be scaled to different lengths of time

Pros and Cons of Other Options

Bit by bit decrement

* Pro: simpler, easier to implement 
* Con: more rigid design, animation not smooth
