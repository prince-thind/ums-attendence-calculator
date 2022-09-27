import { HashRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout";
import Configs from "./pages/Configs";
import Home from "./pages/Home";
import Absents from "./pages/Absents";

function App() {
  const [config, setConfig] = useState(null);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="configs" element={<Configs />} />
          <Route path="configs/absent" element={<Absents />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
