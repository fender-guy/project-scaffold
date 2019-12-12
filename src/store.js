import appReducer from "./redux";
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: appReducer,
  }
);
