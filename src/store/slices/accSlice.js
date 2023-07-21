import { createSlice } from "@reduxjs/toolkit";

const accs = [
  {
    title: "Github",
    items: [
      { href: "https://github.com/suryasarisa99/frontend", label: "Frontend" },
      {
        href: "https://github.com/suryasarisa99/get-std-res",
        label: "Get Std Res",
      },
      { href: "https://github.com/suryasarisa99/notes", label: "Notes" },
      { href: "https://github.com/suryasarisa99/ext-data", label: "Ext Data" },
    ],
    input: {
      url: "https://github.com/suryasarisa99/%s",
      placeholder: "add github repo",
    },
  },
  {
    title: "Vercel",
    items: [
      { href: "https://s546.vercel.app", label: "S546" },
      { href: "https://stdn-res.vercel.app", label: "Stdn Res" },
      { href: "https://get-std-res.vercel.app", label: "Get Std Res" },
    ],
    input: {
      placeholder: "add veriste site",
      url: "https://%s.vercel.app",
    },
  },
];

const accSlice = createSlice({
  initialState: accs,
  name: "accs",
  reducers: {
    accInitial(state, action) {
      return action.payload;
    },
    addAcc(state, action) {
      state.push(action.payload);
      storeAcc(state);
    },
    removeAcc(state, action) {
      state.slice(action.payload, 1);
      storeAcc(state);
    },
    editItem(state, action) {
      console.log("replace: ");
      console.log(action.payload.index);
      state[action.payload.mIndex].items[action.payload.iIndex] =
        action.payload.accItem;
      console.log(state[action.payload.mIndex]);
      storeAcc(state);
    },
    addItem(state, action) {
      state[action.payload.mIndex].items.push(action.payload.item);
      storeAcc(state);
    },
    removeItem(state, action) {
      state[action.payload.mIndex].items.splice(action.payload.index, 1);
      storeAcc(state);
    },
  },
});

function storeAcc(state) {
  localStorage.setItem("accs", JSON.stringify(state));
}
export const { reducer: accReducer } = accSlice;
export const { addAcc, removeAcc, editItem, addItem, accInitial, removeItem } =
  accSlice.actions;
