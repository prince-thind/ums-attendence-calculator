import generateCalender from "./utilities/generateCalender";
import populateCalender from "./utilities/populateCalender";

function main(config) {
    const calender = generateCalender(config);
    populateCalender(calender,config);


    console.log(calender)

}

export default main;