const fs = require('fs')
const weekStructure = require('../config/weekStructure.json');
const config = require('../config/config.json');


const subjects = Object.keys(weekStructure[0])

module.exports = function generateCSV(report) {

    const outputExists = fs.existsSync('./output')
    if (!outputExists) fs.mkdirSync('./output')

    const pen = fs.createWriteStream(`./output/attendence-report-${config.fileName}.csv`)

    pen.write(`Date,Percentage,${subjects.join(",")}\n`);

    for (const entry of report) {
        const date = entry.date.toLocaleString().split(',')[0];

        if (shouldSkip(entry)) continue;

        let percentages = "";
        for (const sub of subjects) {
            percentages += entry[sub].percentage + ","
        }


        pen.write(`${date},${entry.percentage},${percentages}\n`)
    }

}

function shouldSkip(entry) {
    if (!config.showOnlyDaysWithClasses) return false;

    let sumOfLecturesToday = 0;
    for (const sub of subjects) {
        sumOfLecturesToday += entry[sub].lectures;
    }

    if (sumOfLecturesToday === 0) return true;
    return false;

}