import { Link } from "react-router-dom";
import FileUpload from "../components/FIleUpload";
import download from "../lib/download";

export default function Configs({ config, setConfig }) {
  return (
    <div className="module">
      <section>
        <h2> Select a Config to Edit</h2>
        <ul>
          <li>
            <Link to="/configs/main">Main</Link>
          </li>
          <li>
            <Link to="/configs/absents">Absents</Link>
          </li>
          <li>
            <Link to="/configs/teachersOnLeave">Teachers On Leave</Link>
          </li>
          <li>
            <Link to="/configs/makeups">Makeup Lectures</Link>
          </li>
          <li>
            <Link to="/configs/holidays">University official Holidays</Link>
          </li>
          <li>
            <Link to="/configs/weekStructure">Week Structure</Link>
          </li>
        </ul>
        <button
          onClick={() => {
            download( config.main.fileName+'\'sConfig.json',JSON.stringify(config, null, 1));
          }}
        >
          Download Config
        </button>
        <FileUpload setConfig={setConfig}/>
      </section>
    </div>
  );
}
