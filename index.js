const TOTAL_WEEKS=6;

const fs = require('fs');
const pen = fs.createWriteStream('./output.csv');

const weekStructure = require('./weekStructure.json')
const absents = require('./absents.json')
const holidays = require('./holidays.json');
const noClasses = require('./noClasses.json');

const calender = getCalender();
calender.forEach(removeNoClasses);

const totalLectures = getTotalLectures();

const finalCalender = calender.map(calculatePercentage);

toCSV(finalCalender);


function removeNoClasses(calenderDay){
    const noClassesDay=noClasses.find(entry=>entry.date==calenderDay.date.toISOString().split("T")[0])
    if(noClassesDay){
        for(const [subject,missedClasses] of Object.entries(noClassesDay.subjects)){
            calenderDay[subject].lecturesToday=calenderDay[subject].lecturesToday-missedClasses;
        }

    }
}

function toCSV() {
    pen.write('Date,Percentage,INT222,SOC888,INT407,INT405\n');
    for (const calenderDay of finalCalender) {
        pen.write(`${calenderDay.date.toISOString().split("T")[0]},${calenderDay.totalPercentage},${calenderDay.int222.percentage},${calenderDay.soc808.percentage},${calenderDay.int407.percentage},${calenderDay.int405.percentage}\n`)
    }
}


function calculatePercentage(calenderDay) {
    calenderDay.int222.percentage = getPercentage(calenderDay.date, 'int222');
    calenderDay.soc808.percentage = getPercentage(calenderDay.date, 'soc808');
    calenderDay.int405.percentage = getPercentage(calenderDay.date, 'int405');
    calenderDay.int407.percentage = getPercentage(calenderDay.date, 'int407');
    calenderDay.totalPercentage = calculateTotalPercentage(calenderDay.date);
     return calenderDay;
}

function getPercentage(tillDate, subject) {
    const total = totalLectures[subject];
    const attended = getAttendedLecturesTillDate(tillDate, subject)
    const percentage = +(attended / total * 100).toFixed(2);
    return percentage;
}

function calculateTotalPercentage(date){
    const total = totalLectures['int222']+totalLectures['soc808']+totalLectures['int405']+totalLectures['int407'];
    const int222=getAttendedLecturesTillDate(date,'int222');
    const soc808=getAttendedLecturesTillDate(date,'soc808');
    const int405=getAttendedLecturesTillDate(date,'int405');
    const int407=getAttendedLecturesTillDate(date,'int407');

    const attended=int222+soc808+int407+int405;

    return +(attended/total*100).toFixed(2)
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

        obj.int222 = { lecturesToday: isDateHoliday(date) ? 0 : daysOfWeek[date.getDay()].int222 }
        obj.soc808 = { lecturesToday: isDateHoliday(date) ? 0 : daysOfWeek[date.getDay()].soc808 };
        obj.int407 = { lecturesToday: isDateHoliday(date) ? 0 : daysOfWeek[date.getDay()].int407 };
        obj.int405 = { lecturesToday: isDateHoliday(date) ? 0 : daysOfWeek[date.getDay()].int405 };


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
    const totalLectures = {
        int222: calender.reduce((acc, date) => {
            return acc + date.int222.lecturesToday;
        }, 0),

        soc808: calender.reduce((acc, date) => {
            return acc + date.soc808.lecturesToday;
        }, 0),
        int405: calender.reduce((acc, date) => {
            return acc + date.int405.lecturesToday;
        }, 0)
        , int407: calender.reduce((acc, date) => {
            return acc + date.int407.lecturesToday;
        }, 0)
    }
    return totalLectures;
}