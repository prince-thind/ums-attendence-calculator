import { HashRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Configs from "./pages/Configs";
import Home from "./pages/Home";
import GenericConfig from "./pages/GenericConfig";
import sampleConfig from "./lib/sampleConfig";

function App() {
  const [config, setConfig] = useState(getConfig());

  useEffect(() => {
    localStorage.setItem("config", JSON.stringify(config));
  }, [config]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home config={config} />} />
          <Route path="configs" element={<Configs />} />
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
              />
            }
          />
          <Route
            path="configs/teachersOnLeave"
            element={
              <GenericConfig
                config={config}
                setConfig={setConfig}
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
              />
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}

function getConfig() {
  const localConfig = JSON.parse(localStorage.getItem("config")??"{}");
  console.log(localConfig)
  if (Object.keys(localConfig).length > 1) {
    return localConfig;
  }
  return sampleConfig;
}

export default App;
