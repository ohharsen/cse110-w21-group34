# Manual Testing 

// visual tests on the Graph 


**making sure that additional interruptions or tasks completed don’t increase the bar in the bar graph** 

- tested by making interruptions in the timer and completing tasks, then making sure it doesn’t affect the bars in the graph 

making sure the graph and stats automatically update while the pane is open without having to reopen pane

tested by changing the time of pomo to 3 seconds then repeatedly finishing pomos and making sure the stats and graph automatically reflected these updates these changes while the stats pane was open 

making sure the y axis splits in graph correctly change with the max value of pomos in a day 

tested by changing time of pomo to 3 seconds then tested from max pomo being 0 up until 20, and made sure the correct splits were displayed in each case 

This accounts for the 3 cases when max less than 3 and 11 or greater than 10, and also checks whether it correctly adjusts the highest split to be a multiple of 3. 

Test to make sure setting and graph page properly resize when window height  is decreased 

tested by opening stats pane then shrinking window height then making sure stats pane correctly shrinks and creates a scroll bar that allows to scroll through stats pane  

tested by opening settings pane then shrinking window height then making sure settings pane and text correctly shrinks and creates a scroll bar that allows to scroll through settings pane 

Test to make sure setting and graph page properly resize when window width is decreased 

tested by opening stats pane then shrinking window width then making sure stats pane correctly squeezes and expands, and when the width gets small enough to only display stats pane. 

tested by opening settings pane then shrinking and expanding window width then making sure settings pane correctly squeezes and expands, and when the width gets small enough to only display settings pane. 

making sure when colorblind accessibility is turned on, that settings and graph pane correctly change 

For settings pane, tested by opening settings pane then turning on colorblind access and making sure the text and colors change accordingly while settings pane is open, then closing and reopening pane to make sure the changes are maintained. 

For stats pane, tested by opening settings pane then turning on colorblind access. Then opening stats pane and making sure the text and colors change accordingly, then closing and reopening pane to make sure the changes are maintained. 
