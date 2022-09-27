import { HashRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Configs from "./pages/Configs";
import Home from "./pages/Home";
import Main from "./pages/MainConfig";

function App() {
  const [config, setConfig] = useState(
    JSON.parse(localStorage.getItem("config") ?? "{}")
  );

  useEffect(() => {
    localStorage.setItem("config", JSON.stringify(config));
  }, [config]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="configs" element={<Configs />} />
          <Route
            path="configs/main"
            element={<Main config={config} setConfig={setConfig} />}
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
