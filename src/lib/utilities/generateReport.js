export default function generateReport(calender, masterConfig) {

    const weekStructure = masterConfig.weekStructure;
    const absents = masterConfig.absents;
    const config = masterConfig.main;
    const subjects = Object.keys(weekStructure[0]);

    const res = [];
    const totalLectures = getLecturesTillDate(calender, subjects, masterConfig.lastday);

    for (const calenderEntry of calender) {
        const entry = {}
        entry.date = calenderEntry.date;
        const lecturesTillThisDay = getLecturesTillDate(calender, subjects, calenderEntry.date, absents)

        entry.percentage = (lecturesTillThisDay / totalLectures * 100).toFixed(2)

        for (const sub of subjects) {
            entry[sub] = {};
            entry[sub].lectures = calenderEntry[sub];
            const lecturesTillThisDay = getLecturesTillDate(calender, [sub], calenderEntry.date, absents)
            const totalLecturesOfThisSub = getLecturesTillDate(calender, [sub])
            entry[sub].percentage = (lecturesTillThisDay / totalLecturesOfThisSub * 100).toFixed(2)
        }

        res.push(entry)
    }

    return res;


}


function getLecturesTillDate(calender, subjects, date, absents = {}) {
    let res = 0;
    for (const calenderEntry of calender) {
        const calenderDate = new Date(calenderEntry.date);
        if (calenderDate > date) return res;

        for (const sub of subjects) {
            res += calenderEntry[sub]
            res -= getAbsents(calenderDate, sub, absents);
        }
    }
    return res;
}


function getAbsents(date, subject, absents) {
    if (!absents[subject]) return 0;

    const totalAbsents = absents[subject].filter(absent => {
        const absentDate = new Date(absent);
        if (+absentDate == +date) return true;
        return false;
    })

    return totalAbsents.length;

}
