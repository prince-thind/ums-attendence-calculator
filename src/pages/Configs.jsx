import { Link } from "react-router-dom";

export default function Configs() {
  return (
    <div>
        <p> Select any of the configs to edit or <Link to="/">Go Back to Home</Link></p>
      <ul>
        <li>
          <Link to="/configs/main">Main</Link>
        </li>
        <li>
          <Link to="/configs/absents">Absents</Link>
        </li>
        <li>
          <Link to="/configs/teacherOnLeave">Teachers On Leave</Link>
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
