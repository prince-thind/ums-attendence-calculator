import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <p>
        Please Edit the configs before generating the CSV here:{" "}
        <Link to="configs">Configs</Link>
      </p>
      <button onClick={genrateCSV}>Generate</button>
    </div>
  );
}

function genrateCSV(){
    alert('todo: generate csv')
}
