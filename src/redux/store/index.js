import { configureStore } from "@reduxjs/toolkit";
import billsReducer from "../features/bills/billsSlice";

export const store = configureStore({
  reducer: {
    bills: billsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["bills/setBillDate"],
        ignoredActionPaths: ["payload.date"],
        ignoredPaths: ["bills.items.date"],
      },
    }),
});

export default store;
