import { CheckCircle, PencilIcon, TrashIcon } from "lucide-react";
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
              className={`p-4 border-b border-slate-700/50 space-y-3 
                ${optimalBillIds.has(bill.id) ? "bg-green-900/20" : ""}`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {optimalBillIds.has(bill.id) && (
                      <CheckCircle className="text-green h-4 w-4 flex-shrink-0" />
                    )}
                    <p className="font-medium text-slate-200">
                      {bill.description}
                    </p>
                  </div>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-slate-700/50 text-slate-300">
                    {bill.category}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingBill(bill)}
                    className="p-2 text-slate-400 hover:text-primary-light transition-colors"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeletingBill(bill)}
                    className="p-2 text-slate-400 hover:text-red transition-colors"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">{formatDate(bill.date)}</span>
                <span className="font-medium text-slate-200">
                  {formatCurrency(bill.amount)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto scrollbar-custom">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-800/50">
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {bills.map((bill) => (
                <tr
                  key={bill.id}
                  className={`transition-colors hover:bg-slate-700/30 
                    ${optimalBillIds.has(bill.id) ? "bg-green-900/20" : ""}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {optimalBillIds.has(bill.id) && (
                        <CheckCircle className="text-green h-4 w-4 flex-shrink-0" />
                      )}
                      <span className="font-medium text-slate-200">
                        {bill.description}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 font-medium text-slate-300">
                      {bill.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-200">
                    {formatCurrency(bill.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-400">
                    {formatDate(bill.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setEditingBill(bill)}
                        className="text-slate-400 hover:text-primary-light transition-colors"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setDeletingBill(bill)}
                        className="text-slate-400 hover:text-red transition-colors"
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
