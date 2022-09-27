import {  useState } from "react";

export default function MainConfig({ config, setConfig }) {
  const [textData, setTextData] = useState(config.main);

  return (
    <div>
      <p>Main Configuration File</p>
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
      configCopy.main = textData;
      return configCopy;
    });
  }
}
