export default function generateReport(calender, masterConfig) {
  const weekStructure = masterConfig.weekStructure;
  const absents1 = masterConfig.absents;
  const dutyLeaves = masterConfig.dutyLeaves;
  const config = masterConfig.main;
  const subjects = Object.keys(weekStructure[0]);

  const absents = popDutyLeaves(absents1, dutyLeaves);

  const stats = getStats(calender, subjects, config);

  const res = [];

  for (const calenderEntry of calender) {
    const entry = {};
    entry.date = calenderEntry.date;
    const lecturesTillThisDay = getLecturesTillDate(
      calender,
      subjects,
      calenderEntry.date,
      absents
    );

    entry.percentage = (
      (((lecturesTillThisDay / stats.totalLectures) * 100) /
        config.basePercentage) *
      100
    ).toFixed(2);

    for (const sub of subjects) {
      entry[sub] = {};
      const lecturesTillThisDay = getLecturesTillDate(
        calender,
        [sub],
        calenderEntry.date,
        absents
      );
      entry[sub].lectures = calenderEntry[sub];
      const totalLecturesOfThisSub = getLecturesTillDate(calender, [sub]);
      entry[sub].percentage = (
        (((lecturesTillThisDay / totalLecturesOfThisSub) * 100) /
          config.basePercentage) *
        100
      ).toFixed(2);
    }

    res.push(entry);
  }

  return [res, stats];
}

function getStats(calender, subjects, masterConfig) {
  const totalLectures = getLecturesTillDate(
    calender,
    subjects,
    masterConfig.lastday
  );

  const res = {};
  for (const sub of subjects) {
    const subLectures = getLecturesTillDate(
      calender,
      [sub],
      masterConfig.lastday
    );
    res[sub] = subLectures;
  }

  return { totalLectures, ...res };
}

function getLecturesTillDate(calender, subjects, date, absents = {}) {
  let res = 0;
  for (const calenderEntry of calender) {
    const calenderDate = new Date(calenderEntry.date);
    if (calenderDate > date) return res;

    for (const sub of subjects) {
      res += calenderEntry[sub];
      res -= getAbsents(calenderDate, sub, absents);
    }
  }
  return res;
}

function getAbsents(date, subject, absents) {
  if (!absents[subject]) return 0;

  const totalAbsents = absents[subject].filter((absent) => {
    const absentDate = new Date(absent);
    if (+absentDate == +date) return true;
    return false;
  });

  return totalAbsents.length;
}

function popDutyLeaves(absents, dutyLeaves) {
  const res = structuredClone(absents);
  for (const sub in dutyLeaves) {
    if (absents[sub]) {
      res[sub] = absents[sub].filter(
        (rdate) => !dutyLeaves[sub].includes(rdate)
      );
    }
  }
  return res;
}
