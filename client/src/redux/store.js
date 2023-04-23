import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./CounterSlice";
import schoolsReducer from "./SchoolsSlice";
import authReducer from "./AuthSlice";
import citasReducer from "./CitasSlice";
import reportsReducer from "./ReportsSlice";
import ComparadorSlice from "./ComparadorSlice";
export default configureStore({
  reducer: {
    counter: counterReducer,
    schools: schoolsReducer,
    auth: authReducer,
    citas: citasReducer,
    reports: reportsReducer,
    comparador: ComparadorSlice,
  },
});
