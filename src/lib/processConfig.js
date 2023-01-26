import generateCalender from "./utilities/generateCalender";
import generateCSV from "./utilities/generateCSV";
import generateReport from "./utilities/generateReport";
import populateCalender from "./utilities/populateCalender";

function main(config) {
  const calender = generateCalender(config);
  populateCalender(calender, config);
  const [report, stats] = generateReport(calender, config);
  const csvData = generateCSV(report, config);

  return [csvData, stats];
}

export default main;
