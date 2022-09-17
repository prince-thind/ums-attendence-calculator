# ums-attendence-calculator
basic utility to calcuate attendence. The utility takes into account the mid term exams, other holidays, you or the teacher being absent and also makeups. Play around with the configs and generate your report now!

# Download
### -> if you're not on a machine with nodeJS or want to use this quickly, download the release file from the github's release section (or simply click [here](https://github.com/prince-thind/ums-attendence-calculator/releases/download/v2.1.0/program.zip) to Download) and execute the program.

### -> if you're familiar with the node ecosystem then you can just clone this repo, edit the configs and run 'npm i; npm start' to get your report.


# what it does?
This utility generates an attendence report for you. For example, on 2022-09-15, how much percentage would you have if you stopped going altogether after this date.

# what it's useful for?
To get an estimate of how high your attendance can go and how long you may attend classes before it goes below 75%

# How to use
You need to edit the config files included in the repo (or zip) file and execute the program relevant to your operating system like program-win.exe. The configs are pretty explanatory. Output is generated inside 'output' folder 

Note:
+ weeks starts from sunday inside weekStructure.json
+ each entry in absents.json, teachersOnLeave.json and makeups.json refers to a single lecture. duplicate dates simply mean more lectures on the same date.


### feel free to ask me anything!
