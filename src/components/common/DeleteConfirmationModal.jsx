import { AlertTriangle } from "lucide-react";

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
        <div className="bg-slate-800 rounded-2xl border border-slate-700/50 shadow-xl p-6 animate-float">
          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red" />
            </div>

            <h3 className="text-xl font-semibold text-slate-200 mb-2">
              Confirm Delete
            </h3>

            <p className="text-slate-400 mb-6">
              Are you sure you want to delete this {itemName}? This action
              cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="btn bg-slate-700 hover:bg-slate-600 text-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="btn bg-red hover:bg-red-dark text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
