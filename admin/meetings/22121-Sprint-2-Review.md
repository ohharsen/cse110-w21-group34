- Topic: Code Merging & Hindsight Overview
- Date: 2/18/21
- Time: 11:00am (Sunday)
- Location: Zoom (Online)
- Written by: Michael Brown
- Attendance: 9/9
- Time: 1 hr. 30 min.

## PRs and Merging
```
- All members collaborated live on VS Code

- Start timer testing was fixed
  * Additional updates/tweaks in visuals will carry into Sprint 3 tasks
  * ie. finalizations in ring color transitions + fade effects

- William's code merged afterward
 * Task button functionality

- After-thoughts
 * Code is becoming quite hefty; need to make more modular
 * ie. linting, commenting, splitting code into individual, appropriate files

- Overall coverage:
  * Dropped to sub 60%
  * Aiming for >75% by end of week/sprint
```

## Closing Coverage of JS code

File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|----------------------------
All files |   61.47 |    47.06 |   61.54 |   61.47 | 
 index.js |   61.47 |    47.06 |   61.54 |   61.47 | 37-40,61-82,96-118,247-258

NOTE (as of 2/20/21):
- Testing improvements over the following weekend has resulted in coverage of 89%!

----------

# Overview of Contributions

In hindsight of our work and accomplishments throughout Sprint 2, our team has been able to successfully construct an MVP for our Pomodoro app. With that in mind, there awaits a larger set of tasks that our group will divide and conquer in the coming weeks ahead. As for now, we will delve further into what each member/sub-group achieved as well as how their contributions influenced the overall design of our project.


### Statistics
- Contributors: **Joshua Narezo, Michael Khanzadeh, Vedparkash Singh**

This group was tasked with producing the essential functionality of our statistics page of the web application. The majority of this work comprised of front-end development, such as the page's opening/closing animations and button event listeners. The HTML implementation was kept simplistic in design as the information we wish to display is intended to appear in a vertical fashion. Hence, several containers (divs) were utilized to help organize the text and make the necessary stylization as concise/simple as possible. The animation and appearance of the page was then implemented as a majority of the group's code was written in CSS. Lastly, two panel buttons were implemented via onclick listeners in JS to allow the user to open/close the stats display. Open and close functions were also written to implement the visual transition cues.

Each of the members as a whole had worked both synchronously (ie. live Zoom sessions for simultaneous programming sessions) as well as asynchronously (ie. Slack and merging each other's code) before merging their finalized part with our main branch.

Before the end of the sprint, the group moved further into the back-end design phase. This early brainstorming phase was necessary to solidify how our program would retrieve information and store data with persistence. Luckily, William's implementations with the app's task button as well as back-end JS functions were prepared for the stats team to refer to for additional guidance. 

*Examples of developed code:*

![](./sprint2Files/stats-css-glimpse.gif)

![](./sprint2Files/stats-html-glimpse.PNG)



### Task Button
- Contributor: **William Sun**



```

### Timer
- Contributors: **Keshab Agarwal, Michael Brown**
```

```

### Skeleton Page
- Contributors: **Arsen Ohanyan**
```

```


### Start / Stop Button
- Contributor: **Viren Abhyankar**
```

```



```
a. Stats Page (Ved, Michael K., Josh)
- Local storage updates when user completes pomos
  * Timestamps can be converted into strings for computations/attaining actual values
- Extended goals/current challenges
  * Discussing finalized data structures to use
- Transition animations function as expected
- Works independently from timer countdown + animations

b. Complete Task Button (William)
  - Local storage implementation
  - Is now merged with main

c. Timer (Keshab, Michael B.)
  - Timer functionality is implemented
  - Works via button click (start, reset functionality)
  - Fixtures
    * Testing and PRs needed
  - Extended goals: window resizing and fading animations

d. Skeleton (Amy, Arsen)
  - Skeleton / outline has been completed
  - Open for further implementations from other groups
  - PRs needed

e. Start / Stop Button (Viren)
 - Implemented and merged with main
 - Functionality combined/merged with timer
```

## Closing Thoughts
- Great progress thus far
- MVP is complete
- Further development recommended to be test-driven
- More-efficient PRs and descriptive issues for up-to-datem, asynchronous work
