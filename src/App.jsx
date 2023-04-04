import { HashRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Configs from "./pages/Configs";
import Home from "./pages/Home";
import GenericConfig from "./pages/GenericConfig";
import sampleConfig from "./lib/sampleConfig";
import "./App.css";

function App() {
  const [config, setConfig] = useState(getConfig());

  const configASCII = btoa(JSON.stringify(config));

  useEffect(() => {
    const url = new URL(window.location);
    const presentData = url.searchParams.get("data");

    if (presentData === configASCII) return;

    url.searchParams.set("data", configASCII);
    window.history.pushState(null, "", url.toString());
  }, [configASCII]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={<Home config={config} setConfig={setConfig} />}
          />
          <Route
            path="configs"
            element={<Configs config={config} setConfig={setConfig} />}
          />
          <Route
            path="configs/main"
            element={
              <GenericConfig
                config={config}
                setConfig={setConfig}
                type="main"
              />
            }
          />
          <Route
            path="configs/absents"
            element={
              <GenericConfig
                config={config}
                setConfig={setConfig}
                type="absents"
                instructions="Each date entry signifies a single absent Lecture, duplicates signify multiple"
              />
            }
          />
          <Route
            path="configs/teachersOnLeave"
            element={
              <GenericConfig
                config={config}
                setConfig={setConfig}
                instructions="Each date entry signifies a single Lecture missed by teacher, duplicates signify multiple"
                type="teachersOnLeave"
              />
            }
          />
          <Route
            path="configs/makeups"
            element={
              <GenericConfig
                config={config}
                setConfig={setConfig}
                instructions="Each date entry signifies a single makeup Lecture, duplicates signify multiple"
                type="makeups"
              />
            }
          />
          <Route
            path="configs/holidays"
            element={
              <GenericConfig
                config={config}
                setConfig={setConfig}
                type="holidays"
              />
            }
          />
          <Route
            path="configs/weekStructure"
            element={
              <GenericConfig
                config={config}
                setConfig={setConfig}
                type="weekStructure"
                instructions="weeks start from sunday"
              />
            }
          />
          <Route
            path="configs/dutyLeaves"
            element={
              <GenericConfig
                config={config}
                setConfig={setConfig}
                type="dutyLeaves"
              />
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}

function getConfig() {
  const url = new URL(window.location);
  const presentData = url.searchParams.get("data");

  if (presentData) {
    const urlConfig = JSON.parse(atob(presentData));
    const localConfig = urlConfig ?? "{}";

    if (Object.keys(localConfig).length > 1) {
      return localConfig;
    }
  }

  return sampleConfig;
}

export default App;
