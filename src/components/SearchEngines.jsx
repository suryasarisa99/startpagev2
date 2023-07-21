import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { select } from "../store/store";
export default function SearchEngines({ state: [showSE, setShowSE] }) {
  const { data } = useSelector((state) => state.se);
  const dispatch = useDispatch();
  // let showSE = true;
  return (
    <AnimatePresence>
      {showSE && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "140%" }}
          className="s-es"
        >
          {data.map((se, index) => {
            const IconComponent = se.logo;
            return (
              <div
                className="s-e"
                key={se.label}
                onClick={() => {
                  dispatch(select(index));
                  setShowSE(false);
                  //   setAdv(false);
                  // searchRef.current.focus();

                  // localStorage.setItem("seIndex", index);
                }}
              >
                <div className="s-e-logo">
                  <IconComponent />
                </div>
                <div className="s-e-label">{se.label}</div>
                {/* </div> */}
              </div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
