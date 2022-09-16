const fs = require('fs')
const weekStructure = require('../config/weekStructure.json');

const subjects = Object.keys(weekStructure[0])
const pen = fs.createWriteStream('./output/attendence-report.csv')

module.exports = function generateCSV(report) {
    pen.write(`Date,Percentage,${subjects.join(",")}\n`);

    for (const entry of report) {
        const date=entry.date.toLocaleString().split(',')[0];
        let percentages="";
        for(const sub of subjects){
            percentages+=entry[sub].percentage+","
        }
        pen.write(`${date},${entry.percentage},${percentages}\n`)
    }

}