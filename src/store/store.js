import { configureStore } from "@reduxjs/toolkit";
import {
  addAcc,
  removeAcc,
  accReducer,
  editItem,
  addItem,
  accInitial,
  removeItem,
} from "./slices/accSlice";

import { select, setQuery, seReducer, seInitial } from "./slices/seSlice";
import {
  historyReducer,
  addHistory,
  removeHistory,
  historyInitial,
} from "./slices/history";
const store = configureStore({
  reducer: {
    accs: accReducer,
    se: seReducer,
    history: historyReducer,
  },
});

export {
  removeItem,
  store,
  addAcc,
  removeAcc,
  editItem,
  addItem,
  accInitial,
  seInitial,
  historyInitial,
  select,
  setQuery,
  addHistory,
  removeHistory,
};
