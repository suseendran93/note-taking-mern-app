import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    changeColor: (state, action) => {
      state.value = action;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeColor } = colorSlice.actions;

export default colorSlice.reducer;
