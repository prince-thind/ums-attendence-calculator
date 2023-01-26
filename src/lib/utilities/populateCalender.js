export default function populateCalender(calender, config) {
  const holidays = config.holidays;
  const teachersOnLeave = config.teachersOnLeave;
  const makeups = config.makeups;
  const weekStructure = config.weekStructure;
  const dutyLeaves = config.dutyLeaves;
  const subjects = Object.keys(weekStructure[0]);

  for (const entry of calender) {
    const dayOfWeek = entry.date.getDay();
    const weekStructureEntry = weekStructure[dayOfWeek];

    const date = entry.date;
    if (isDateHoliday(date, holidays)) continue;

    for (const sub of subjects) {
      entry[sub] =
        weekStructureEntry[sub] +
        getMakeupClasses(date, sub, makeups) -
        getTeacherAbsent(date, sub, teachersOnLeave);
    }
  }
}

function isDateHoliday(date, holidays) {
  return holidays.some((rawHolidayDate) => {
    const holidayDate = new Date(rawHolidayDate);
    if (+holidayDate === +date) return true;
    return false;
  });
}

function getMakeupClasses(date, subject, makeups) {
  if (!makeups[subject]) return 0;

  const totalMakeups = makeups[subject].filter((makeup) => {
    const makeupDate = new Date(makeup);
    if (+makeupDate == +date) return true;
    return false;
  });

  return totalMakeups.length;
}

function getTeacherAbsent(date, subject, teachersOnLeave) {
  if (!teachersOnLeave[subject]) return 0;

  const totalLeaves = teachersOnLeave[subject].filter((leave) => {
    const leaveDate = new Date(leave);
    if (+leaveDate == +date) return true;
    return false;
  });

  return totalLeaves.length;
}
