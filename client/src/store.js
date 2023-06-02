import { configureStore } from "@reduxjs/toolkit";
import colorReducer from "./slices/ColorSlice";
export const store = configureStore({
  reducer: {
    changeColor: colorReducer,
  },
});
