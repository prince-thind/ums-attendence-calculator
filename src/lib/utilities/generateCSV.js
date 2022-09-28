
export default function generateCSV(report, masterConfig) {

    const weekStructure = masterConfig.weekStructure;
    const config = masterConfig.main;
    const subjects = Object.keys(weekStructure[0])

    let res = (`Date,Day,Percentage,${subjects.join(",")}\n`);

    for (const entry of report) {
        const date = entry.date.toLocaleString().split(',')[0];
        const day = entry.date.toLocaleString('en-US', { weekday: 'long' })

        if (shouldSkip(entry, config, subjects)) continue;

        let percentages = "";
        for (const sub of subjects) {
            percentages += entry[sub].percentage + ","
        }


        res += (`${date},${day},${entry.percentage},${percentages}\n`)
    }

    return (res);

}

function shouldSkip(entry, config, subjects) {
    if (!config.showOnlyDaysWithClasses) return false;

    let sumOfLecturesToday = 0;
    for (const sub of subjects) {
        sumOfLecturesToday += entry[sub].lectures;
    }

    if (sumOfLecturesToday === 0) return true;
    return false;

}