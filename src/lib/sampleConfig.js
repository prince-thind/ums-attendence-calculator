const config = {
  absents: {
    int301: ["2023-01-18"],
    int411: ["2023-01-17"],
  },
  main: {
    firstDay: "2023-01-05",
    lastday: "2023-05-09",
    showOnlyDaysWithClasses: true,
    fileName: "prince",
    basePercentage: 100,
  },
  holidays: [
    "2023-01-26",
    "2023-02-05",
    "2023-03-08",
    "2023-04-22",
    "2023-03-14",
    "2023-03-15",
    "2023-03-16",
    "2023-03-17",
    "2023-03-18",
    "2023-03-19",
    "2023-03-20",
    "2023-03-21",
  ],
  makeups: {
    int301: ["2023-02-04", "2023-02-04"],
  },
  dutyLeaves: {
    int301: ["2023-01-18"],
  },
  teachersOnLeave: {
    int301: ["2023-01-23", "2023-01-23"],
    psy802: ["2023-01-16", "2023-01-17"],
    int411: ["2023-01-11"],
  },
  weekStructure: [
    {
      int301: 0,
      int411: 0,
      int416: 0,
      psy802: 0,
    },
    {
      int301: 2,
      int411: 1,
      int416: 2,
      psy802: 1,
    },
    {
      int301: 0,
      int411: 1,
      int416: 0,
      psy802: 1,
    },
    {
      int301: 2,
      int411: 1,
      int416: 1,
      psy802: 1,
    },
    {
      int301: 0,
      int411: 0,
      int416: 0,
      psy802: 0,
    },
    {
      int301: 0,
      int411: 0,
      int416: 0,
      psy802: 0,
    },
    {
      int301: 0,
      int411: 0,
      int416: 0,
      psy802: 0,
    },
  ],
};

export default config;
