export default function Table({ csvData }) {
  const csvArr = csvData.split("\n");
  const header = csvArr.shift().split(",");

  const rows = csvArr.map((rawRow) => {
    return rawRow.split(",");
  });

  return (
    <table>
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
            <tr key={index}>
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
