import { Link } from "react-router-dom";

export default function Home({ config }) {
  return (
    <div>
      <p>
        Please Edit the configs before generating the CSV here:{" "}
        <Link to="configs">Configs</Link>
      </p>
      <button onClick={genrateCSV}>Generate</button>
    </div>
  );
  function genrateCSV() {
    console.log(config);
  }
}
