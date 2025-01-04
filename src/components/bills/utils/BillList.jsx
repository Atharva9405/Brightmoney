import { CheckCircle, PencilIcon, TrashIcon } from "lucide-react";
import { CheckCheck } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectFilteredBills,
  selectOptimalBills,
} from "../../../redux/features/bills/selectors";
import { useBillActions } from "../../../hooks/useBillActions";
import { formatCurrency, formatDate } from "../../../utils/format";
import DeleteConfirmModal from "../../common/DeleteConfirmationModal";
import Modal from "../../common/Modal";
import BillForm from "./BillForm";

const BillList = () => {
  const bills = useSelector(selectFilteredBills);
  const { optimalBillIds, count, totalAmount } =
    useSelector(selectOptimalBills);
  const { handleDeleteBill, handleUpdateBill } = useBillActions();
  const [editingBill, setEditingBill] = useState(null);
  const [deletingBill, setDeletingBill] = useState(null);

  return (
    <div className="space-y-4 backdrop-blur-lg border border-white/50 rounded-2xl">
      <div className="table-container overflow-hidden">
        <div className="flex flex-col justify-center items-center p-4 md:p-6 border-b border-slate-700/50">
          <h2 className="text-2xl font-semibold text-slate-200">Bills</h2>
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          {bills.map((bill) => (
            <div
              key={bill.id}
              className={`p-4 border-b border-gray-700/50 space-y-3 
        ${optimalBillIds.has(bill.id) ? "bg-purple-900/30" : ""}`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {optimalBillIds.has(bill.id) && (
                      <CheckCircle className="text-purple-500 h-4 w-4 flex-shrink-0" />
                    )}
                    <p className="font-medium text-gray-200">
                      {bill.description}
                    </p>
                  </div>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-700/50 text-gray-300">
                    {bill.category}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingBill(bill)}
                    className="p-2 text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeletingBill(bill)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{formatDate(bill.date)}</span>
                <span className="font-medium text-gray-200">
                  {formatCurrency(bill.amount)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto scrollbar-custom table-container rounded-2xl bg-slate-900/80 backdrop-blur-lg border border-slate-800 transition-all duration-300">
          <table className="table w-full">
            <thead className="bg-gradient-to-r from-purple-800 via-purple-700 to-indigo-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-indigo-200 uppercase tracking-wide">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-indigo-200 uppercase tracking-wide">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-indigo-200 uppercase tracking-wide">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-indigo-200 uppercase tracking-wide">
                  Date
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-indigo-200 uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {bills.map((bill) => (
                <tr
                  key={bill.id}
                  className={`hover:bg-indigo-900/40 ${
                    optimalBillIds.has(bill.id) ? "bg-indigo-900/20" : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {optimalBillIds.has(bill.id) && (
                        <CheckCheck className="text-green-500 h-5 w-5 flex-shrink-0" />
                      )}
                      <span className="font-medium text-indigo-100">
                        {bill.description}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-sm font-semibold text-white bg-indigo-600 rounded-full">
                      {bill.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-indigo-200">
                    {formatCurrency(bill.amount)}
                  </td>
                  <td className="px-6 py-4 text-indigo-400">
                    {formatDate(bill.date)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => setEditingBill(bill)}
                        className="text-indigo-300 hover:text-indigo-100 transition-colors"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setDeletingBill(bill)}
                        className="text-red-500 hover:text-red-300 transition-colors"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {bills.length === 0 && (
          <div className="p-8 text-center text-slate-400">
            <p className="text-lg font-medium">No bills found</p>
            <p className="text-sm">Add some bills to see them listed here</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {editingBill && (
        <Modal isOpen={true} onClose={() => setEditingBill(null)}>
          <BillForm
            initialData={editingBill}
            onClose={() => setEditingBill(null)}
            onSubmit={handleUpdateBill}
          />
        </Modal>
      )}

      <DeleteConfirmModal
        isOpen={!!deletingBill}
        onClose={() => setDeletingBill(null)}
        onConfirm={() => {
          handleDeleteBill(deletingBill.id);
          setDeletingBill(null);
        }}
        itemName="bill"
      />
    </div>
  );
};

export default BillList;
