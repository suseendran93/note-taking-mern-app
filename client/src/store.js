import { configureStore } from "@reduxjs/toolkit";
import colorReducer from "./slices/colorSlice";
import refreshReducer from "./slices/RefreshSlice";
export const store = configureStore({
  reducer: {
    color: colorReducer,
    refresh: refreshReducer,
  },
});
