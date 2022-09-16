const config = require('../config/config.json')

module.exports = function generateCalender() {
    const res = [];
    const firstDay = new Date(config.firstDay);
    const lastDay = new Date(config.lastday);

    const dayInBetween = Math.ceil(lastDay - firstDay) / (1000 * 3600 * 24);

    for (let i = 0; i < dayInBetween; i++) {
        const date = new Date(firstDay);
        date.setDate(date.getDate() + i);

        const entry = {
            int222: 0,
            soc808: 0,
            int405: 0,
            int407: 0,
            date
        }

        res.push(entry)
    }

    return res;

}