
export default function generateCSV(report, masterConfig) {

    const weekStructure = masterConfig.weekStructure;
    const config = masterConfig.main;
    const subjects = Object.keys(weekStructure[0])

    let res = (`S.No, Date,Day,Percentage,${subjects.join(",")}\n`);

    let index=1;
    for (const entry of report) {
        const date = entry.date.toISOString().split('T')[0];
        const day = entry.date.toLocaleString('en-US', { weekday: 'long' })

        if (shouldSkip(entry, config, subjects)) continue;

        let percentages = "";
        for (const sub of subjects) {
            percentages += entry[sub].percentage + ","
        }
        percentages = percentages.slice(0, percentages.length-1)


        res += (`${index++},${date},${day},${entry.percentage},${percentages}\n`)
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