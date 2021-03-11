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
* Keep track of task data for the week
  - total-task-count
  - today-task-count
  - week-task-count
  - today-date
  - week-start-date
  - week-history 

## Decision Outcome

Chosen option: track task data for the week, because

* Stores all the relevant data for our graph and statistics
* Easier to track data compared to a list of tasks completed

Pros and Cons of Other Options

Pomos per task

* Pro: keeps track of total pomos per task completed
* Con: messier to parse data from list and contains less information about week history
* Con: tracks the day for each task, but more logic needs to be implemented for the graph in statistics
