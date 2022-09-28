import { useState } from "react";

export default function GenericConfig({ config, setConfig, type }) {
  const [textData, setTextData] = useState(
    JSON.stringify(config[type], null, 1)
  );

  return (
    <div className="module">
      <h2>Configuration File: {type}</h2>
      <form onSubmit={saveConfig}>
        <textarea onChange={updateTextData} value={textData}></textarea>
        <button>Save</button>
      </form>
    </div>
  );

  function updateTextData(e) {
    setTextData(e.target.value);
  }

  function saveConfig(e) {
    e.preventDefault();
    setConfig((config) => {
      const configCopy = JSON.parse(JSON.stringify(config ?? {}));
      configCopy[type] = JSON.parse(textData);
      return configCopy;
    });
    alert("saved!");
  }
}
