const config = require('../config/config.json')
const weekStructure = require('../config/weekStructure.json');

const subjects = Object.keys(weekStructure[0]);

module.exports = function generateCalender() {
    const res = [];
    const firstDay = new Date(config.firstDay);
    const lastDay = new Date(config.lastday);

    const dayInBetween = Math.ceil(lastDay - firstDay) / (1000 * 3600 * 24);

    for (let i = 0; i <= dayInBetween; i++) {
        const date = new Date(firstDay);
        date.setDate(date.getDate() + i);

        const entry = {
            date
        }

        for (const sub of subjects) {
            entry[sub] = 0;
        }

        res.push(entry)
    }

    return res;

}