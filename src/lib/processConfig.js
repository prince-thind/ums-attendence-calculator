import generateCalender from "./utilities/generateCalender";
import generateReport from "./utilities/generateReport";
import populateCalender from "./utilities/populateCalender";

function main(config) {
    const calender = generateCalender(config);
    populateCalender(calender, config);
    const report = generateReport(calender, config)

    console.log(report)

}

export default main;