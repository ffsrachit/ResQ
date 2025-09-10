import { combineReducers, configureStore } from "@reduxjs/toolkit";
import disasterslice from "./disasterslice";

const rootReducer = combineReducers({
  disaster: disasterslice
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
