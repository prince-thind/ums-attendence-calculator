# ums-attendence-calculator
basic utility to calcuate attendence. The utility takes into account the mid term exams, other holidays, you or the teacher being absent and also makeups. Play around with the configs and generate your report now!

# Link: [Here](https://prince-thind.github.io/ums-attendence-calculator)

# what it does?
This utility generates an attendence report for you. For example, on 2022-09-15, how much percentage would you have if you stopped going altogether after this date.

# what it's useful for?
To get an estimate of how high your attendance can go and how long you may attend classes before it goes below 75%

# How to use
You need to edit the configs on the site. The configs are stored on localstorage so you can close and reload the page as many times as you wish. The configs are pretty explanatory. Output is generated as a table and users can download CSV too.

Note:
+ weeks starts from sunday inside weekStructure.json
+ each entry in absents.json, teachersOnLeave.json and makeups.json refers to a single lecture. duplicate dates simply mean more lectures on the same date.


### feel free to ask me anything!