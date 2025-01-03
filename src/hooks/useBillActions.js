import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addBill, updateBill, deleteBill } from "../features/bills/billsSlice";
import { validateBill } from "../utils/validation";

export const useBillActions = () => {
  const dispatch = useDispatch();

  const handleAddBill = useCallback(
    (billData) => {
      const validatedData = validateBill(billData);
      dispatch(addBill(validatedData));
    },
    [dispatch]
  );

  const handleUpdateBill = useCallback(
    (billData) => {
      const validatedData = validateBill(billData);
      dispatch(updateBill(validatedData));
    },
    [dispatch]
  );

  const handleDeleteBill = useCallback(
    (billId) => {
      dispatch(deleteBill(billId));
    },
    [dispatch]
  );

  return { handleAddBill, handleUpdateBill, handleDeleteBill };
};
