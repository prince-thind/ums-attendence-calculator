const generateCalender=require('./lib/generateCalender');
const populateCalender = require('./lib/populateCalender');
const calender=generateCalender();

populateCalender(calender);

console.log(calender.slice(0,1))

