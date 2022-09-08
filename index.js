const fs=require('fs');
const weekStructure=require('./weekStructure.json')
const absents=require('./absents.json')
const holidays=require('./holidays.json');

const calender = getCalender();
const totalLectures = getTotalLectures();

const finalCalender = calender.map(calculatePercentage);


console.log(...finalCalender)

function calculatePercentage(calenderDay) {
    calenderDay.int222.percentage = getPercentage(calenderDay.date, 'int222');
    calenderDay.soc808.percentage = getPercentage(calenderDay.date, 'soc808');
    calenderDay.int405.percentage = getPercentage(calenderDay.date, 'int405');
    calenderDay.int407.percentage = getPercentage(calenderDay.date, 'int407');
    calenderDay.totalPercentage=+((calenderDay.int222.percentage+calenderDay.soc808.percentage+calenderDay.int405.percentage+calenderDay.int407.percentage)/4).toFixed(2)
    return calenderDay;
}

function getPercentage(tillDate, subject) {
    const total = totalLectures[subject];

    const attended = calender.reduce((acc, calenderDay) => {
        if (tillDate < calenderDay.date) return acc;
        const absentDay=absents.find(absentDate=>absentDate.date==calenderDay.date.toISOString().split("T")[0])
        if(absentDay){
            if(absentDay.subjects.includes(subject)) return acc;
        }
        return acc + calenderDay[subject].lecturesToday;
    }, 0)

    const percentage = +(attended / total * 100).toFixed(2);
    return percentage;
}

function getCalender() {
    const res = [];
    const daysOfWeek = weekStructure;
    for (let i = 1; i <= 7 * 16; i++) {
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