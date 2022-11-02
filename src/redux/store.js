import { configureStore } from "@reduxjs/toolkit";
import programmSlice from "./reducer";

export const store = configureStore({
  reducer: {
    programm: programmSlice,
  },
});
