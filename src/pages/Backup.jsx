import React, { useRef, useState } from "react";
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
  const [selectedFile, setSelectedFile] = useState("No File Selected");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selFileRef = useRef(null);

  const restore = (e) => {
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

      if (obj.accs) localStorage.setItem("accs", JSON.stringify(obj.accs));
      if (obj.history)
        localStorage.setItem("history", JSON.stringify(obj.history));
      if (obj.se) localStorage.setItem("se", JSON.stringify(obj.se));
      navigate("/");
    };
  };

  return (
    <div className="backup">
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

      <form action="" onSubmit={restore}>
        <p className="info">Restore from File</p>

        <input
          type="file"
          name="file"
          accept="application/json"
          ref={selFileRef}
          style={{ display: "none" }}
          onChange={(e) => setSelectedFile(e.target.files[0].name)}
        />
        <div className="input-file">
          <button type="button" onClick={() => selFileRef.current.click()}>
            Select File
          </button>
          <p>{selectedFile}</p>
        </div>
        <button type="submit" className="btn" onClick={() => {}}>
          Restore
        </button>
      </form>
      {/* <p>{selected}</p> */}
    </div>
  );
}
