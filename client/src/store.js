import { configureStore } from "@reduxjs/toolkit";
import colorReducer from "./slices/colorSlice";
export const store = configureStore({
  reducer: {
    color: colorReducer,
  },
});
