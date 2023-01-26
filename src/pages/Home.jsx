import sampleConfig from "../lib/sampleConfig";
import { Link } from "react-router-dom";
import processConfig from "../lib/processConfig";
import { useState } from "react";
import Table from "../components/Table";
import Stats from "../components/Stats";
import download from "../lib/download";

export default function Home({ config, setConfig }) {
  const [csvData, setCsvData] = useState(null);
  const [statsData, setStatsData] = useState(null);

  return (
    <div className="module">
      <section>
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
      </section>
      <button onClick={genrateCSV}>Generate Report</button>

      {csvData && <Table csvData={csvData} />}
      {statsData && (
        <Stats statsData={statsData} csvData={csvData} config={config} />
      )}
      {csvData && (
        <button
          onClick={() => {
            download(config.main.fileName + ".csv", csvData);
          }}
        >
          Download CSV
        </button>
      )}
    </div>
  );
  function genrateCSV() {
    const [csvString, stats] = processConfig(config);
    setCsvData(csvString);
    setStatsData(stats);
  }

  function resetConfigs() {
    setConfig(sampleConfig);
    alert("configs reset!");
  }
}
