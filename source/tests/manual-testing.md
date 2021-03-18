# Manual Testing 

### Visual Tests on Stats and Settings Pane (few gifs included to demonstrate the testing)

**Making sure the graph and stats automatically update while the stats pane is open without having to reopen pane**

- Tested by changing the time of a pomo to 3 seconds then repeatedly finishing pomos and making sure the stats displayed and graph automatically reflect these these changes while the stats pane was open 

**Making sure that additional interruptions or tasks completed don’t increase the bar in the bar graph** 

- Tested by making interruptions in the timer and completing tasks, then making sure it doesn’t affect the bars in the graph 

**Making sure the y-axis splits in graph correctly change with the max value of pomos in a day**

- Tested by changing time of a pomo to 3 seconds, then tested from max pomo in a day being 0 up until 20, and made sure the correct splits were correctly displayed in each case while the stats pane was open and when closing and reoping stats pane 

  - This accounts for the 3 cases when max less than 3 and 11 or greater than 10, and also checks whether it correctly adjusts the highest split to be a multiple     of 3 in any case where the original max is not a multiple of 3

**Tested to make sure setting and graph page properly resize when window height is decreased and increased**

- For stats pane, tested by opening stats pane then shrinking and increasing window height then making sure stats pane correctly shrinks and expands and creates a scroll bar that allows user to scroll through stats pane when the height of the window becomes too small  

![](https://github.com/4R53N/cse110-w21-group34/blob/manual-testing/source/gifs/stats-scroll.gif)


- For settings pane, tested by opening settings pane then shrinking and increasing window height then making sure settings pane and text correctly shrinks and expands and creates a scroll bar that allows user to scroll through settings pane 

![](https://github.com/4R53N/cse110-w21-group34/blob/manual-testing/source/gifs/settings-scroll.gif)

**Tested to make sure setting and stats page properly resize when window width is decreased and increased** 

- For stats pane, tested by opening stats pane then shrinking and expanding window width then making sure stats pane correctly squeezes and expands, and when the width gets small enough to only display stats pane

- For settings pane, tested by opening settings pane then shrinking and expanding window width then making sure settings pane correctly squeezes and expands, and when the width gets small enough to only display settings pane

**Tested to make sure when colorblind accessibility is turned on, that settings and stats pane correctly change** 

- For stats pane, tested by opening settings pane then turning on colorblind access. Then opening stats pane and making sure the text and colors change accordingly, then closing and reopening pane to make sure the changes are maintained

![](https://github.com/4R53N/cse110-w21-group34/blob/manual-testing/source/gifs/stats-colorblind.gif)

- For settings pane, tested by opening settings pane then turning on colorblind access and making sure the text and colors change accordingly while settings pane is open, then closing and reopening pane to make sure the changes are maintained

![](https://github.com/4R53N/cse110-w21-group34/blob/manual-testing/source/gifs/settings-colorblind.gif)


