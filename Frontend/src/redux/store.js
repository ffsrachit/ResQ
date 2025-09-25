import { combineReducers, configureStore } from "@reduxjs/toolkit";
import disasterslice from "./disasterslice";
import authSlice from "./authSlice";

const rootReducer = combineReducers({
  disaster: disasterslice,
  auth: authSlice,
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
