import { Link } from "react-router-dom";

export default function Configs() {
  return (
    <div className="module">
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
    </div>
  );
}
