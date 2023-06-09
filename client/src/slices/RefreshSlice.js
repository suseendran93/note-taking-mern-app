import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const refreshSlice = createSlice({
  name: "refresh",
  initialState,
  reducers: {
    changeRefresh: (state, action) => {
      state.value = action;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeRefresh } = refreshSlice.actions;

export default refreshSlice.reducer;
