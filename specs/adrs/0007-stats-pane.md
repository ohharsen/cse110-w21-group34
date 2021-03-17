# Statistics Pane Design

* Status: accepted
* Deciders: all members of the team
* Date: 02/22/2021

## Context and Problem Statement

We were deciding on our stats pane format, what information to display.

## Considered Options

* Show today's information
  - Pomo cycles completed
  - Number of interruptions
  - Total tasks completed
* Show this week's information
  - Pomo cycles completed
  - Number of interruptions
  - Total tasks completed
* Show totals
  - Pomo cycles completed
  - Average interruptions
  - Best day
  - Total tasks completed
* Show week task history graph
* Show week pomo history graph

## Decision Outcome

Chosen option: today's information, totals, and week pomo history graph because

* Comfortably fits in the stats pane
  - No empty space
  - Screen is not cramped
* Splits the statistics pane into three distinct sections
  - Each section is unique, there is no repeated information
* Utilizes all data in local storage

## Pros and Cons of Other Options

### Week information, Week task graph

* Pro: shows more information about week trends 
* Pro: utilizes local storage information in different ways
  - Different statistics can be calculated from week data
* Con: doesn't fit in the stats pane
  - Week pomo graph already displayed, so task graph cannot fit in the limited space
* Con: not necessary information with respect to usage of pomodoro
  - Week pomo data already displayed in graph
  - Daily task data more relevant to user compared to week data
* Con: some information is repetitive and unnecessary
