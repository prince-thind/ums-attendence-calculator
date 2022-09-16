const weekStructure = require('../config/weekStructure.json');
const absents = require('../config/absents.json');
const config = require('../config/config.json');

const subjects = Object.keys(weekStructure[0]);

module.exports = function generateReport(calender) {
    const res = [];
    const totalLectures = getLecturesTillDate(calender, subjects);


    for (const calenderEntry of calender) {
        const entry = {}
        entry.date = calenderEntry.date;
        const lecturesTillThisDay = getLecturesTillDate(calender, subjects, calenderEntry.date, true)

        entry.percentage = (lecturesTillThisDay / totalLectures * 100).toFixed(2)

        for (const sub of subjects) {
            entry[sub] = {};
            entry[sub].lectues = calenderEntry[sub];
            const lecturesTillThisDay = getLecturesTillDate(calender, [sub], calenderEntry.date, true)
            const totalLecturesOfThisSub=getLecturesTillDate(calender,[sub])
            entry[sub].percentage =  (lecturesTillThisDay / totalLecturesOfThisSub * 100).toFixed(2)
        }

        res.push(entry)
    }

    return res;


}


function getLecturesTillDate(calender, subjects, date = new Date(config.lastday), accountAbsents) {
    let res = 0;
    for (const calenderEntry of calender) {
        const calenderDate = new Date(calenderEntry.date);
        if (calenderDate > date) return res;

        for (const sub of subjects) {
            res += calenderEntry[sub]

            if (accountAbsents) {
                res -= getAbsents(calenderDate, sub);
            }
        }
    }
    return res;
}


function getAbsents(date, subject) {
    if (!absents[subject]) return 0;

    const totalAbsents = absents[subject].filter(absent => {
        const absentDate = new Date(absent);
        if (+absentDate == +date) return true;
        return false;
    })

    return totalAbsents.length;

}

