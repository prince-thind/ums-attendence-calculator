import { useState } from "react";

export default function GenericConfig({ config, setConfig, type }) {
  const [textData, setTextData] = useState(
    JSON.stringify(config[type], null, 1)
  );
  const [error, setError] = useState(null);

  return (
    <div className="module">
      <h2>Configuration File: {type}</h2>
      <form onSubmit={saveConfig}>
        <textarea onChange={updateTextData} value={textData}></textarea>
        <p className="error"> {error}</p>
        <button>Save</button>
      </form>
    </div>
  );

  function updateTextData(e) {
    const json = e.target.value;
    const jsonError = checkJSONValidity(json);

    setTextData(json);
    setError(jsonError);
  }

  function saveConfig(e) {
    e.preventDefault();
    if (error) return alert('please fix the errors first!');

    setConfig((config) => {
      const configCopy = JSON.parse(JSON.stringify(config ?? {}));
      configCopy[type] = JSON.parse(textData);
      return configCopy;
    });
    alert("saved!");
  }
}

function checkJSONValidity(json) {
  try {
    JSON.parse(json);
  } catch (e) {
    return e.message;
  }
  return null;
}
