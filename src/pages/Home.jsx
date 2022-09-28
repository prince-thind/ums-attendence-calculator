import { Link } from "react-router-dom";

export default function Home({ config }) {
  return (
    <div className="module">
      <h2>Instructions</h2>
      <ul>
        <li>
          If you haven't already, edit the config files{" "}
          <Link to="configs">here</Link>.
        </li>
        <li> Data is saved in localstorage, so you can continue using this tool even after you exit and reopen this website.</li>
        <li>For motivation and other details refer github readme <a href="https://github.com/prince-thind/ums-attendence-calculator"> here</a>.</li>
      </ul>
      <button onClick={genrateCSV}>Generate CSV</button>
    </div>
  );
  function genrateCSV() {
    console.log(config);
  }
}
