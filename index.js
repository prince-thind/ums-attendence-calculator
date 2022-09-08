const calender = getCalender();
const totalLectures = getTotalLectures();

const absents=[
    {
        date:new Date("2022-08-25").toISOString().split("T")[0],
        subjects:['int407','int222']
    }
]
const finalCalender = calender.map(calculatePercentage);


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
    const daysOfWeek = getDays();
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
    const holidays = [
        new Date("2022-08-15"),
        new Date("2022-09-20"),
        new Date("2022-09-21"),
        new Date("2022-09-22"),
        new Date("2022-09-23"),
        new Date("2022-09-24"),
        new Date("2022-09-25"),
        new Date("2022-09-26"),
        new Date("2022-10-05"),
        new Date("2022-10-24"),
        new Date("2022-10-25"),
        new Date("2022-11-08"),
    ].map(e => e.toISOString().split('T')[0])

    if (holidays.includes(finalDate)) return true;
    return false;
}

function getPresentAttendence() {
    return {
        int222: {
            total: 22,
            attended: 20
        },
        int405: {
            total: 18,
            attended: 18
        },
        int407: {
            total: 16,
            attended: 15
        },
        soc808: {
            total: 16,
            attended: 16
        },
    }

}

function getDays() {
    return [
        {
            int222: 0,
            int405: 0,
            int407: 0,
            soc808: 0,
        },
        {
            int222: 0,
            int405: 0,
            int407: 1,
            soc808: 1,
        }, {
            int222: 2,
            int405: 3,
            int407: 0,
            soc808: 1,
        }, {
            int222: 0,
            int405: 0,
            int407: 1,
            soc808: 1,
        }, {
            int222: 2,
            int405: 0,
            int407: 1,
            soc808: 0,
        }, {
            int222: 0,
            int405: 0,
            int407: 0,
            soc808: 0,
        }, {
            int222: 0,
            int405: 0,
            int407: 0,
            soc808: 0,
        },


    ]
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