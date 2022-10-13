export default function Table({ csvData }) {
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

  return (
    <table className="main-table">
      <thead>
        <tr>
          {header.map((heading, index) => {
            return <th key={index}>{heading}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => {
          return (
            <tr
              key={index}
              className={row[1] == closestDateToToday ? "active-date" : ""}
            >
              {row.map((cell, index) => {
                return <td key={index}>{cell}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
