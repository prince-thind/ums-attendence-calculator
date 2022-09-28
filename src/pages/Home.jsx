import sampleConfig from "../lib/sampleConfig";
import { Link } from "react-router-dom";
import processConfig from "../lib/processConfig";
import { useState } from "react";
import Table from "../components/Table";

export default function Home({ config, setConfig }) {
  const [csvData, setCsvData] = useState(null);

  return (
    <div className="module">
      <h2>Instructions</h2>
      <ul>
        <li>
          If you haven't already, edit the config files{" "}
          <Link to="configs">here</Link>.
        </li>
        <li>
          {" "}
          Data is saved in localstorage, so you can continue using this tool
          even after you exit and reopen this website.
        </li>
        <li>
          For motivation and other details refer github readme{" "}
          <a href="https://github.com/prince-thind/ums-attendence-calculator">
            here
          </a>
          .
        </li>
        <li>
          if you want to reset configs click{" "}
          <a href="#" onClick={resetConfigs}>
            {" "}
            here
          </a>
        </li>
      </ul>
      <button onClick={genrateCSV}>Generate CSV</button>
      {csvData && <Table csvData={csvData} />}
    </div>
  );
  function genrateCSV() {
    const csvString = processConfig(config);
    setCsvData(csvString);
  }

  function resetConfigs() {
    setConfig(sampleConfig);
    alert("configs reset!");
  }
}
