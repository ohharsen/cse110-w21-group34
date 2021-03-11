# Graph Format

* Status: accepted
* Deciders: all members of the team
* Date: 03/07/2021

## Context and Problem Statement

We were deciding on our graph format.

## Considered Options

* Bar graph
  - bar for each day (Monday - Sunday)
  - x axis: number of pomos per day
  - y axis: day of week
* Line graph
  - Point for each day (Monday - Sunday)
  - x axis: number of pomos per day
  - y axis: day of week
  - line connecting days

## Decision Outcome

Chosen option: Bar graph, because

* Better represents week history data
* Looks cleaner in showing user trends
* Fills the empty space more as opposed to line graph
* 

Pros and Cons of Other Options

Line graph

* Pro: simpler
* Pro: connected line shows the trend between days
* Con: more empty space in the graph 
* Con: doesn't fit our data set for only seven days as well as bar graph
