```
- Team: Teddy Bears
- Date: 3/7/21
- Time: 9:00pm (Sunday)
- Duration: 30 min.
- Location: Zoom (Online)
- Written by: Michael Brown
- Attendance: 9/9
```

# A Brief Introduction

After the conclusion of Sprint 2, our team had successfully developed an MVP (Minimum Viable Product). The skeleton code of our HTML, CSS, and JS files were established and  populated with functional components. These implementations included a functioning timer, start/stop button, animated UI, and more. Our project's steady progression was heavily influenced by the ways in which we organized ourselves into sub-groups to tackle specific challenges. This success was also attributed by everyone's timely dedication (whether in-person via Zoom or asynchronously across Slack and GitHub).

This level of effort continued into Weeks 8 and 9 for our third Sprint of the quarter. With the MVP out of the way, much of our focus was dedicated to the extensive reorganization and overall improvement of our code. Our previous PRs had left some bugs that were inevitably squashed while testing became more prevelant across future implementations. These improvements created a safer foundation for our members to develop more advanced features. Our sub-groups from Sprint 2 were kept the same to maintain our members' familiarity with the components they had created.

The section below entails the unique contributions of our members as well as the groups they worked with. Take note that there was more cross-pollination in everyone's work this time around in comparison to earlier sprints. This was especially prevalent in Week 9 as most of our prioritized features were finalized, leaving us with room to explore our original stretch goals.

-------

# Team Contributions

### Statistics
- Contributors: **Joshua Narezo, Michael Khanzadeh, Vedparkash Singh**

Main points:
- phases of stats development (back-end localStorage/data retrieval, front-end display population and graphical appearances)

-------

### Pomo Counter + localStorage
- Contributor: **Amy Shen**
- pomo cycle tweaks (ie. cycle pomo movement, synchronized with user interactions)
- 

-------

### Task Button
- Contributors: **Viren Abhyankar, William Sun**

-------

### Timer
- Contributors: **Keshab Agarwal, Michael Brown**

Due to a high number of PRs at the end of Sprint 2, a collision in our code was seemingly inevitable. Thankfully, the timer team responded quickly and resolved a UI glitch in the center of our clock due to a mistakenly deleted portion of CSS code. In addition to this and other design tweaks, Michael B. and Keshab collaborated to resolve several more bugs. These optimizations resided in our JS files, such as updating the interval of our timer countdown function to respond to user input immediatly rather than via 1-second intervals. Another improvement involved simplifying the timer JS functionality from two separate functions (a timer and break counter) into a single function with proper conditionals.

Following Arsen's introduction of Cypress testing to the group project, Michael and Keshab created a new file to increase code coverage. This testing file overlooked the functionality of our start/stop button, proper text display, pomo cycle tracker, and more.

Near the end of the sprint, the Timer Team engaged with new stretch goal features as some of the images below entail a WIP settings pane. Michael utilized the HTML and CSS code written by the statistics team (Joshua, Vedparkash, Michael K.) to clone a left-hand page whereas Keshab's goal will be to help populate its inner panes.

- *Example of written Cypress testing:*
![](./sprint3Files/Countdown-Cypress.gif)

- *Early WIP build of left pane:*
![](./sprint3Files/Left-Pane.PNG)

-------


### Features + Cleanup

- Contributor: **Arsen Ohanyan**

- accessibility features, linting automated tests, code cleanup


*Example of visual tweak for accessibility:*
Original Appearance        |  Color Brightness/Modification
:-------------------------:|:-------------------------:
![](./sprint3Files/color-original.png)  |  ![](./sprint3Files/color-accessibility.png)

-------

# Demo Overview (w/ Sprint 2 MVP Comparison)
- Take note that the timer durations in both GIFs are shortened for simplified demonstration.

## Before:
![](./sprint2Files/MVP-Sprint-2.gif)

## After:






**Viren**
- Configure task button disable
- Completing task button with William
- Local storage function back-end completion
- Improving readability of code for simplistic testing
- Completing prompt to user for tracking interuption

- Future: go over testing; make sure nothing is a "dummy test"

-------

**Michael K.**
- Collaborating with Josh and Ved
- Completing the Graph implementation
  - Formatting the graph; cleaner UI appearance
- Splitting data via x/y axis labels; implmeneting spacing, organization, etc.

- Wrote axis formula for scaling
  - Writing out necessary functions

- Next: implementing storage graph to update automatically
- Creating more Jest/Cypress tests with group for complete coverage

-- Fit in image of graph overview with group here --

-------

**Josh**
- Exploring new visual improvements (for higher-res monitors)
- Collaborating with Michael K. and Ved
- Lots of progress in live mob session

- Planning; created Figma design for graph
  - ie. axes, behavior, organization
  - Sketching module to divide work simultaneously

- Completed drawing for the bars + x-axis labels
- Experimenting with pixel scaling for consistent transformation of app UI

Future: Working to figure out / complete further CSS responsiveness

-------

Arsen
- Worked on keystroke/accessibility features/stretch goals
- ie. toggles for color changes for colorblindness accessibility
- further testing improvements


-------
**Ved**
- Collaboration with Michael K. and Josh
- Setup for extraction of data in back-end
- Animations and visuals (in Week 8)

- Week 9 --> applying everything to final website (making PRs)
  - Connecting the JS to the HTML

- Focusing on the testing side of the group completion
- Completing daily stats with Michael K.

-------

**William**
- Breaking down large local storage function with Viren (week 8)
- Creating more tests in local storage and writing out

- Smooth week progression 

(screenshot of the local storage and (

-------

**Keshab**

- Collaboration with Michael B.
- Implementation of design changes/improvements
  - Fixing font and time container on center of screen
  - Resizing bugs fixed

- Implementation of timer notification sound effect (when timer goes off)
- Further bug issues completing with Micahel B.

- PRs made in week 9
- Cypress testing written out

-------

**Michael B.**
- Collaboration with Keshab
- Solving prevalent bugs in timer functionality from previous PRs
- Continuing documentation in admin file (group notes for back-track of team progress)
- Attempting stretch goal feature for settings tab

-------

**Amy**
- Worked on pomo counter for task
- Implementing cycle tracker 
  - ironing out further bugs from PR merging conflicts

- Week 9, adapted code to later PRs
  - Total cycle count updated in congruence with local storage

-- SCREENSHOT OF LOWER LOCATION OF POMO COUNT (BOTTOM OF SCREEN) --
