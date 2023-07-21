import { createSlice } from "@reduxjs/toolkit";
import {
  FaYoutube,
  FaGoogle,
  FaTwitter,
  FaYahoo,
  FaInstagram,
} from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

import { SiDuckduckgo, SiMicrosoftbing } from "react-icons/si";
const se = [
  {
    href: "https://www.google.com/search?q=%s",
    label: "Google",
    logo: FaGoogle,
  },
  {
    href: "https://www.youtube.com/results?search_query=%s",
    label: "Youtube",
    logo: FaYoutube,
  },
  {
    href: "https://www.bing.com/search?q=%s",
    logo: SiMicrosoftbing,
    label: "Bing",
  },
  {
    href: "https://www.instagram.com/%s",
    logo: FaInstagram,
    label: "Instagram",
  },
  // {
  //   href: "https://duckduckgo.com/?q=%s",
  //   logo: FaYahoo,
  //   label: "Yahoo",
  // },
  {
    href: "https://duckduckgo.com/?q=%s",
    logo: SiDuckduckgo,
    label: "Duck Duck Go",
  },
];

const seSlice = createSlice({
  initialState: { selected: 0, data: se, query: "" },
  name: "se",
  reducers: {
    select(state, action) {
      state.selected = action.payload;
      store(state.selected);
    },
    setQuery(state, action) {
      state.query = action.payload;
    },
    seInitial(state, action) {
      state.selected = action.payload;
    },
  },
});

function store(data) {
  localStorage.setItem("se", JSON.stringify(data));
}
export const { reducer: seReducer } = seSlice;
export const { select, setQuery, seInitial } = seSlice.actions;
