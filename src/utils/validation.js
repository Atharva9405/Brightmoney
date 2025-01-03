export const validateBill = (billData) => {
  const errors = {};

  if (!billData.description?.trim()) {
    errors.description = "Description is required";
  }

  if (!billData.category?.trim()) {
    errors.category = "Category is required";
  }

  const amount = Number(billData.amount);
  if (isNaN(amount) || amount <= 0) {
    errors.amount = "Amount must be a positive number";
  }

  if (!billData.date) {
    errors.date = "Date is required";
  }

  if (Object.keys(errors).length > 0) {
    throw new Error(JSON.stringify(errors));
  }

  return {
    ...billData,
    amount: amount.toString(),
  };
};
