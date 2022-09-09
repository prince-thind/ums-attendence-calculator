const TOTAL_WEEKS = 16;

const fs = require('fs');
const pen = fs.createWriteStream('./output.csv');

const weekStructure = require('./weekStructure.json')
const subjects = Object.keys(weekStructure[0]);

const absents = require('./absents.json')
const holidays = require('./holidays.json');
const noClasses = require('./noClasses.json');

const calender = getCalender();
calender.forEach(removeNoClasses);

const totalLectures = getTotalLectures();

const finalCalender = calender.map(calculatePercentage);

toCSV(finalCalender);


function removeNoClasses(calenderDay) {
    const noClassesDay = noClasses.find(entry => entry.date == calenderDay.date.toISOString().split("T")[0])
    if (noClassesDay) {
        for (const [subject, missedClasses] of Object.entries(noClassesDay.subjects)) {
            calenderDay[subject].lecturesToday = calenderDay[subject].lecturesToday - missedClasses;
        }

    }
}

function toCSV() {
    pen.write(`Date,Percentage,${subjects.join(",")}\n`);
    for (const calenderDay of finalCalender) {
        pen.write(`${calenderDay.date.toISOString().split("T")[0]},${calenderDay.totalPercentage},${calenderDay[subjects[0]].percentage},${calenderDay[subjects[1]].percentage},${calenderDay[subjects[2]].percentage},${calenderDay[subjects[3]].percentage},\n`)
    }
}


function calculatePercentage(calenderDay) {
    for (const subject of subjects) {
        calenderDay[subject].percentage = getPercentage(calenderDay.date, subject);
    }
    calenderDay.totalPercentage = calculateTotalPercentage(calenderDay.date);
    return calenderDay;
}

function getPercentage(tillDate, subject) {
    const total = totalLectures[subject];
    const attended = getAttendedLecturesTillDate(tillDate, subject)
    const percentage = +(attended / total * 100).toFixed(2);
    return percentage;
}

function calculateTotalPercentage(date) {
    let total = 0;
    for (const subject in totalLectures) {
        total += totalLectures[subject];
    }

    let attended = 0;
    for (const subject of subjects) {
        attended += getAttendedLecturesTillDate(date, subject);

    }

    return +(attended / total * 100).toFixed(2)
}

function getAttendedLecturesTillDate(tillDate, subject) {
    return calender.reduce((acc, calenderDay) => {
        if (tillDate < calenderDay.date) return acc;
        const absentDay = absents.find(absentDate => absentDate.date == calenderDay.date.toISOString().split("T")[0])
        if (absentDay) {
            if (Object.keys(absentDay.subjects).includes(subject)) return acc + calenderDay[subject].lecturesToday - absentDay.subjects[subject];
        }
        return acc + calenderDay[subject].lecturesToday;
    }, 0)
}

function getCalender() {
    const res = [];
    const daysOfWeek = weekStructure;
    for (let i = 1; i <= 7 * TOTAL_WEEKS; i++) {
        const obj = {};

        const date = new Date()
        date.setMonth(7)
        date.setDate(i)
        obj.date = date;

        for (const subject of subjects) {
            obj[subject] = { lecturesToday: isDateHoliday(date) ? 0 : daysOfWeek[date.getDay()][subject] }

        }

        res.push(obj)
    }
    return res;
}

function isDateHoliday(date) {
    const finalDate = date.toISOString().split('T')[0];
    if (holidays.includes(finalDate)) return true;
    return false;
}

function getTotalLectures() {

    const totalLectures = {};

    for (const subject of subjects) {
        totalLectures[subject] = calender.reduce((acc, date) => {
            return acc + date[subject].lecturesToday;
        }, 0)
    }

    return totalLectures;
}