# Accessibility Features

* Status: accepted
* Deciders: all members of the team
* Date: 02/22/2021

## Context and Problem Statement

We were deciding on accessibility features.

## Considered Options

* Color blindness
  - Changes colors to increase saturation and vibrance for the color blind
* Keystroke access
  - Use of keyboard to start timer, stop timer
  - Use of keyboard to complete task
  - Use of keyboard to open help and statistics panes
* Bolded text
  - Bold text of timer
  - Bold text of graph
  - Bold text of help pane
* Increase font size
* Audio enhancements
  - Different sounds for different situations

## Decision Outcome

Chosen option: Color blindness, keystroke access, and bolded text because

* Doesn't interfere with normal design
  - only including bolded text will not ruin our CSS styling
  - bolding text doesn't cramp the screen
* Provides accessibility for users with disabilities
  - increasing saturation makes it easier for the colorblind
  - bolding text makes it easier to read for those with vision impairment
  - keystroke access adds a different way for users to interact with the timer
* Extends our range of users

## Pros and Cons of Other Options

### Increase font size

* Pro: Makes it easier to read the help pane and information in the stats pane
* Pro: More user choices
* Con: Can break the CSS styling
* Con: Cramps the screen more
* Con: doesn't fit in panes with dedicated size

### Audio enhancements

* Pro: Makes it clearer which cycle users are on
* Con: Unneccesary because only one sound is needed to alert users when a cycle is over
* Con: There is already visual information about the pomodoro cycle on screen
  - adding more information would just be repetitive and unwanted
* Con: Different sounds complicates our code
