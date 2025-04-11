import { configureStore } from "@reduxjs/toolkit";
import  authReducer  from "./AuthSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here if needed
  }, // Add your reducers here
});

export default store;
