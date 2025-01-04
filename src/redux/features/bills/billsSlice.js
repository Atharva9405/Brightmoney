import { INITIAL_BILLS, INITIAL_MONTHLY_BUDGET } from "../../../utils/constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: INITIAL_BILLS,
  monthlyBudget: INITIAL_MONTHLY_BUDGET,
  selectedCategory: "all",
  isLoading: false,
  error: null,
};

const billsSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {
    addBill: (state, action) => {
      state.items.push({ ...action.payload, id: Date.now() });
    },
    updateBill: (state, action) => {
      const index = state.items.findIndex(
        (bill) => bill.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteBill: (state, action) => {
      state.items = state.items.filter((bill) => bill.id !== action.payload);
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setBudget: (state, action) => {
      state.monthlyBudget = action.payload;
    },
  },
});

export const { addBill, updateBill, deleteBill, setCategory, setBudget } =
  billsSlice.actions;
export default billsSlice.reducer;
