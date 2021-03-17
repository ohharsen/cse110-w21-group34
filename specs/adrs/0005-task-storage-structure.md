# Task Storage Structure

* Status: accepted
* Deciders: all members of the team
* Date: 02/16/2021

## Context and Problem Statement

We were deciding how to store task data in local storage.

## Considered Options

* Keep track of pomos per task
  - list with each item being a task completed
  - total number of pomos per task with timestamp: "Tasks = [{pomos: 5, timestamp: [“02/08/2021”]}]"
* Keep track of task data for the day
  - today-task-count
  - today-date
* Keep track of task data for the week
  - week-task-count
  - week-start-date
* Keep track of week history data
  - week-history
* Keep track of totals
  - total-task-count

## Decision Outcome

Chosen option: day data, week history, and totals because

* Stores all the relevant data for our graph and statistics
  - needs task number per day of the week
  - need total task count for today
* Easier to track data compared to a list of tasks completed
  - less logic required for extracting data when calculating statistics

## Pros and Cons of Other Options

### Pomos per task

* Pro: keeps track of total pomos per task completed
* Pro: tracks the date for each task completed
* Con: messier to parse data from list and contains less information about week history
* Con: tracks the day for each task, but more logic needs to be implemented for the graph in statistics
* Con: doesn't track the start of the week, it would have to be recalculated
  - local storage would have to be reaccessed and updated later on, which is undesirable

### Week data

* Pro: tracks information about the week which could provide more context to usage patterns
* Pro: statistics like total tasks completed this week are not repetitive
* Con: week history already tracks information about the week
* Con: statistics pane does not use week data
