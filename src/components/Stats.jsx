export default function Stats({ statsData, csvData, config }) {
  const csvArr = csvData.split("\n");
  const header = csvArr.shift().split(",");

  csvArr.pop(); //removing the trailing \n

  const rows = csvArr.map((rawRow) => {
    return rawRow.split(",");
  });

  const closestDateToToday = rows
    .map((r) => r[1])
    .filter((date) => {
      const today = new Date();
      return +new Date(date) <= +today;
    })
    .pop();

  let res = [];
  for (const entry in statsData) {
    let final = rows.find((row) => row[1] == closestDateToToday);
    switch (entry) {
      case "int301":
        final = +final[4];
        break;
      case "int411":
        final = +final[5];
        break;
      case "int416":
        final = +final[6];
        break;
      case "psy802":
        final = +final[7];
        break;
      default:
        final = +final[3];
    }

    let li = (
      <li>
        {entry}:{" "}
        {Math.round(
          (statsData[entry] * final * +config.main.basePercentage) / 100 / 100
        )}
        /{Math.round((statsData[entry] * +config.main.basePercentage) / 100)}
      </li>
    );
    res.push(li);
  }

  return <ul className="stats">{res}</ul>;
}
