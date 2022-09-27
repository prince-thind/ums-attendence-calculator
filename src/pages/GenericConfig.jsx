import { useState } from "react";

export default function GenericConfig({ config, setConfig, type }) {
  const [textData, setTextData] = useState(config[type]);

  return (
    <div>
      <p>Configuration File: {type}</p>
      <form onSubmit={saveConfig}>
        <textarea onChange={updateTextData}>{textData}</textarea>
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
      configCopy[type] = textData;
      return configCopy;
    });
    alert('saved!')
  }
}
