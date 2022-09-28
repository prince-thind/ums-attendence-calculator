export default function generateCalender(config) {
    const { main, weekStructure } = config;

    const subjects = Object.keys(weekStructure[0]);

    const res = [];
    const firstDay = new Date(main.firstDay);
    const lastDay = new Date(main.lastday);

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