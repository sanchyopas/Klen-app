import {configureStore} from "@reduxjs/toolkit";
import {caseApi} from "@/app/redux/caseApi";

export const store = configureStore({
  reducer: {
    [caseApi.reducerPath]: caseApi.reducer,
  }, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(caseApi.middleware)
})