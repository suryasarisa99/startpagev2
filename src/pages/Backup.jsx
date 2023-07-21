import React from "react";
import { saveAs } from "file-saver";
import { useDispatch, useSelector } from "react-redux";
import { accInitial, historyInitial, seInitial } from "../store/store";
import { useNavigate } from "react-router-dom";
export default function Backup() {
  const { accs, history, selected } = useSelector((state) => {
    return {
      accs: state.accs,
      history: state.history,
      selected: state.se.selected,
    };
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      <button
        className="btn"
        onClick={() => {
          const jsonData = JSON.stringify({ accs, history, selected });
          const blobObject = new Blob([jsonData], { type: "application/json" });
          saveAs(blobObject, "surya.json");
        }}
      >
        Backup
      </button>

      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submitted");
          const file = e.target.file.files[0];
          console.log(file);
          const fileReader = new FileReader();
          fileReader.readAsText(file, "UTF-8");
          fileReader.onload = (e) => {
            const obj = JSON.parse(e.target.result);
            if (obj.accs) dispatch(accInitial(obj.accs));
            if (obj.history) dispatch(historyInitial(obj.history));
            if (obj.se) dispatch(seInitial(obj.se));
            navigate("/");
          };
        }}
      >
        <input type="file" name="file" accept="application/json" />
        <button type="submit" className="btn" onClick={() => {}}>
          Restore
        </button>
      </form>
      {/* <p>{selected}</p> */}
    </div>
  );
}
