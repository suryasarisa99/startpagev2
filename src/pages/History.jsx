import { useState } from "react";
import { GiCancel } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { removeHistory } from "../store/store";
export default function History() {
  const history = useSelector((state) => state.history);
  const dispatch = useDispatch();

  return (
    <div className="history">
      <h2>History</h2>
      {history.map((h, index) => {
        return (
          <div
            className="item-icon"
            key={h.query + index}
            onClick={() => open(h.url)}
          >
            <div>{h.query} </div>
            <GiCancel
              className="history-remove-icon"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(removeHistory(index));
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
