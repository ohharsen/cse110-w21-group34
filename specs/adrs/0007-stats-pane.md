# Statistics Pane Design

* Status: accepted
* Deciders: all members of the team
* Date: 02/22/2021

## Context and Problem Statement

We were deciding on our stats pane format, what information to display.

## Considered Options

* Show today task data
* Show week task data
* Show week pomo data
* Show total data
* Show week task graph
* Show week pomo graph

## Decision Outcome

Chosen option: Today task data, total data, and week pomo graph because

* Comfortably fits in the stats pane
  - No empty space
  - Screen is not cramped
* Splits the statistics pane into three distinct sections
  - Each section is unique, there is no repeated information
* Utilizes all data in local storage

## Pros and Cons of Other Options

### Week task data, Week pomo data, Week task graph

* Pro: shows more information about week trends 
* Pro: utilizes local storage information in different ways
  - Different statistics can be calculated from week data
* Con: doesn't fit in the stats pane
  - Week pomo graph already displayed, so task graph cannot fit in the limited space
* Con: not necessary information with respect to usage of pomodoro
  - Week pomo data already displayed in graph
  - Daily task data more relevant to user compared to week data
* Con: some information is repetitive and unnecessary
