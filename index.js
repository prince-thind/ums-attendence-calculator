const generateCalender=require('./lib/generateCalender');
const generateReport = require('./lib/generateReport');
const populateCalender = require('./lib/populateCalender');
const calender=generateCalender();

populateCalender(calender);

const report=generateReport(calender);


