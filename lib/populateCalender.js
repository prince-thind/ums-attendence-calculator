const holidays = require('../config/holidays.json');
const teachersOnLeave = require('../config/teachersOnLeave.json');
const makeups = require('../config/makeups.json');
const weekStructure = require('../config/weekStructure.json');

const subjects = Object.keys(weekStructure[0]);

module.exports = function populateCalender(calender) {
    for (const entry of calender) {
        const dayOfWeek = new Date(entry.date).getDay();
        const weekStructureEntry = weekStructure[dayOfWeek];

        const date = new Date(entry.date);
        if (isDateHoliday(date)) continue;

        for (const sub of subjects) {
            entry[sub] = weekStructureEntry[sub] + getMakeupClasses(date, sub) - getTeacherAbsent(date, sub)
        }

    }
}

function isDateHoliday(date) {
    return holidays.some(holiday => {
        const holidayDate = new Date(holiday);
        if (+holidayDate === +date) return true;
        return false;
    })

}

function getMakeupClasses(date, subject) {
    if (!makeups[subject]) return 0;

    const totalMakeups = makeups[subject].filter(makeup => {
        const makeupDate = new Date(makeup);
        if (+makeupDate == +date) return true;
        return false;
    })

    return totalMakeups.length;

}

function getTeacherAbsent(date, subject) {
    if (!teachersOnLeave[subject]) return 0;

    const totalLeaves = teachersOnLeave[subject].filter(leave => {
        const leaveDate = new Date(leave);
        if (+leaveDate == +date) return true;
        return false;
    })

    return totalLeaves.length;
}