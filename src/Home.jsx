import Acc from "./components/Acc";
// import "../styles/index.scss";
// import Search from "./components/Search";
// import YtAdv from "./components/YtAdv";
// import GoogleAdv from "./components/GoogleAdv";
// import DataContext from "../context/DataContext";
import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronUp } from "react-icons/fa";
import { BsGear } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "./components/Search";
export default function Home() {
  //   let { selectSE, adv } = useContext(DataContext);
  let dispatch = useDispatch();
  let [editMode, setEditMode] = useState(-1);
  let accState = useState(-1);
  let accs = useSelector((state) => state.accs);
  let navigate = useNavigate();
  return (
    <div className="home">
      <div className="icon">
        <BsGear onClick={() => navigate("/settings")} />
      </div>
      <AnimatePresence>
        {
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0" }}
            // exit={{ y: "-10%" }}
            // transition={{ duration: "0.2" }}
            key="acc"
          >
            {accs.map((acc, index) => (
              <Acc
                key={acc.title + index}
                data={acc}
                index={index}
                editMode={editMode}
                setEditMode={setEditMode}
                state={accState}
              />
            ))}
          </motion.div>
        }
      </AnimatePresence>

      <Search />
      {/* <AnimatePresence>
        {selectSE == 0 && adv && <GoogleAdv />}
        {selectSE == 1 && adv && <YtAdv />}
      </AnimatePresence> */}
    </div>
  );
}

let githubData = {
  title: "Github",
  links: [
    { href: "https://github.com/suryasarisa99/frontend", label: "Frontend" },
    {
      href: "https://github.com/suryasarisa99/get-std-res",
      label: "Get Std Res",
    },
    { href: "https://github.com/suryasarisa99/notes", label: "Notes" },
    { href: "https://github.com/suryasarisa99/ext-data", label: "Ext Data" },
  ],
  url: "https://github.com/suryasarisa99/%s",
};

let vercelData = {
  title: "Vercel",
  links: [
    { href: "https://s546.vercel.app", label: "S546" },
    { href: "https://stdn-res.vercel.app", label: "Stdn Res" },
    { href: "https://get-std-res.vercel.app", label: "Get Std Res" },
  ],
  url: "https://%s.vercel.app",
};

// {href:"",label:""},
