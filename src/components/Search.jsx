import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { select, setQuery, addHistory } from "../store/store";
import { FaSearchengin } from "react-icons/fa";
import SearchEngines from "./SearchEngines";

export default function Search() {
  const { data, selected, query } = useSelector((state) => state.se);
  const dispatch = useDispatch();
  const showSE = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const url = data[selected].href.replace("%s", query);
    window.open(url);
    dispatch(addHistory({ query, url }));
  }

  const IconComponent = data[selected]?.logo;

  return (
    <div className="search">
      <SearchEngines state={showSE} />
      <form onSubmit={handleSubmit} className="">
        <button
          onClick={(e) => {
            e.stopPropagation();
            showSE[1]((prv) => !prv);
            // searchRef.current.focus();
          }}
          type="button"
        >
          {<IconComponent />}
        </button>
        <input
          type="text"
          name="search"
          value={query}
          autoComplete="off"
          autoCapitalize="off"
          onChange={(e) => {
            // if (!showHistory) setShowHistory(true);
            dispatch(setQuery(e.target.value));
          }}
          //   ref={searchRef}
        />
      </form>
    </div>
  );
}
