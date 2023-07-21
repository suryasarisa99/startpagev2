import { useState, useEffect } from "react";
import Settings from "./pages/Settings";
import CreateAcc from "./pages/CreateAcc";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import { useDispatch } from "react-redux";
// import { addInitial } from "./store/store";
import History from "./pages/History";
import Clear from "./pages/Clear";
// import { FaGear } from "react-icons/fa";
import { accInitial, historyInitial, seInitial } from "./store/store";
import Backup from "./pages/Backup";
// import { registerSW } from "virtual:pwa-register";

// registerSW();

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const accs = JSON.parse(localStorage.getItem("accs"));
    if (accs) dispatch(accInitial(accs));
    const history = JSON.parse(localStorage.getItem("history"));
    if (history) dispatch(historyInitial(history));
    const se = JSON.parse(localStorage.getItem("se"));
    if (se) dispatch(seInitial(se));
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        {/* <Route path="/history" element={<History />} /> */}
        <Route path="/create-acc" element={<CreateAcc />} />
        <Route path="/history" element={<History />} />
        <Route path="/clear" element={<Clear />} />
        <Route path="/backup" element={<Backup />} />
      </Routes>
    </>
  );
}

export default App;
