# Graph Format

* Status: accepted
* Deciders: all members of the team
* Date: 03/07/2021

## Context and Problem Statement

We were deciding on our graph format: to use a bar graph or line graph.

## Considered Options

* Bar graph
  - bar for each day (Monday - Sunday)
  - x axis: day of week
  - y axis: pomos per day
* Line graph
  - Point for each day (Monday - Sunday)
  - x axis: day of week
  - y axis: pomos per day
  - line connecting days

## Decision Outcome

Chosen option: Bar graph, because

* Better represents week history data
* Looks cleaner in showing user trends
* Fills the empty space more as opposed to line graph
* Graph can be colored in to match the theme of our app

## Pros and Cons of Other Options

### Line graph

* Pro: simpler to implement
* Pro: connected line shows the trend between days
* Con: more empty space in the graph 
* Con: doesn't fit our data set for only seven days as well as bar graph
  - Line graph better for continuous changes over time, whereas bar graphs are better for comparing groups
  - Our data for days of the week fits the latter pattern better
