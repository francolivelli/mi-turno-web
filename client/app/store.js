import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import stepReducer from "./features/stepSlice";
import dateReducer from "./features/dateSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    step: stepReducer,
    date: dateReducer,
  },
});
