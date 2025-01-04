import { createSelector } from "@reduxjs/toolkit";

const selectBills = (state) => state.bills.items;
const selectCategory = (state) => state.bills.selectedCategory;

export const selectFilteredBills = createSelector(
  [selectBills, selectCategory],
  (bills, category) =>
    category === "all"
      ? bills
      : bills.filter(
          (bill) => bill.category.toLowerCase() === category.toLowerCase()
        )
);

export const selectTotalAmount = createSelector(
  [selectFilteredBills],
  (bills) => bills.reduce((sum, bill) => sum + Number(bill.amount), 0)
);

export const selectOptimalBills = createSelector(
  [(state) => state.bills.items, (state) => state.bills.monthlyBudget],
  (bills, budget) => {
    const sortedBills = [...bills].sort(
      (a, b) => Number(a.amount) - Number(b.amount)
    );
    const optimal = new Set();
    let totalAmount = 0;

    for (const bill of sortedBills) {
      const amount = Number(bill.amount);
      if (totalAmount + amount <= budget) {
        optimal.add(bill.id);
        totalAmount += amount;
      }
    }

    return {
      optimalBillIds: optimal,
      count: optimal.size,
      totalAmount: totalAmount,
    };
  }
);
