// import History from "./History";
import { useNavigate } from "react-router-dom";
export default function Settings() {
  let navigate = useNavigate();
  return (
    <div className="settings">
      <p className="settings-head">Settings</p>
      <button
        className="settings-options history-btn f-btn"
        onClick={() => navigate("/history")}
      >
        History
      </button>
      <button
        className="settings-options f-btn"
        onClick={() => navigate("/create-acc")}
      >
        Create Accordian
      </button>
      <button onClick={() => navigate("/backup")} className="f-btn">
        Backup
      </button>
    </div>
  );
}
