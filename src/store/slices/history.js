import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
  initialState: [],
  name: "history",
  reducers: {
    addHistory(state, action) {
      state.push(action.payload);
      store(state);
    },
    removeHistory(state, action) {
      state.splice(action.payload, 1);
      store(state);
    },
    historyInitial(state, action) {
      return action.payload;
    },
  },
});

function store(data) {
  localStorage.setItem("history", JSON.stringify(data));
}
export const { reducer: historyReducer } = historySlice;
export const { addHistory, removeHistory, historyInitial } =
  historySlice.actions;
