import { createSlice } from "@reduxjs/toolkit";

const programmSlice = createSlice({
  name: "programm",
  initialState: {
    programm: [
      {
        workoutId: "",
        treningName: "",
        workoutDate: "",
        workoutCount: "",
        workoutBreak: "",
      },
    ],
  },
  reducers: {
    setProgramm(state, action) {
      state.programm.push(action.payload);
    },
    clearProgramm(state, action) {
      for (let i = 0; i < state.programm.length; i++) {
        console.log(action.payload + " action");
        if (state.programm[i].workoutId === action.payload) {
          console.log(state.programm[i]);
          state.programm.splice(i, 1);
        }
      }
    },
  },
});

export const { setProgramm } = programmSlice.actions;
export const { clearProgramm } = programmSlice.actions;
export default programmSlice.reducer;
