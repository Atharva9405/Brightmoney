import { Calendar, DollarSign, FileText, ListFilter } from "lucide-react";
import { useEffect, useState } from "react";
import { useBillActions } from "../../../hooks/useBillActions";
import { CATEGORIES } from "../../../utils/constants";

const BILL_CATEGORIES = CATEGORIES.slice(1);

const BillForm = ({ initialData = null, onClose }) => {
  const [formData, setFormData] = useState({
    description: "",
    category: BILL_CATEGORIES[0].value,
    amount: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleAddBill, handleUpdateBill } = useBillActions();

  // Load initial data if editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        date: new Date(initialData.date).toISOString().split("T")[0],
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    const amount = Number(formData.amount);
    if (!formData.amount || isNaN(amount) || amount <= 0) {
      newErrors.amount = "Please enter a valid amount greater than 0";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (initialData) {
        await handleUpdateBill(formData);
      } else {
        await handleAddBill(formData);
      }
      onClose();
    } catch (error) {
      console.error(error);
      setErrors((prev) => ({
        ...prev,
        submit: "Failed to save bill. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for the field being edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="space-y-6 bg-black/75">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold text-white">
          {initialData ? "Edit Bill" : "Add New Bill"}
        </h2>
        <p className="mt-1 text-white">
          {initialData
            ? "Update the bill details below."
            : "Enter the bill details below."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Description Field */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Description
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              <FileText size={18} />
            </div>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`input-control pl-10 ${
                errors.description ? "border-red" : "border-slate-700"
              }`}
              placeholder="Enter bill description"
            />
          </div>
          {errors.description && (
            <p className="mt-2 text-sm text-red flex items-center gap-1">
              {errors.description}
            </p>
          )}
        </div>

        {/* Category Field */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Category
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              <ListFilter size={18} />
            </div>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full custom-select bg-slate-800/50 text-slate-200 border border-slate-700/50
                         rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50
                         hover:border-slate-600/50 transition-colors input-control pl-10 appearance-none ${
                           errors.category ? "border-red" : "border-slate-700"
                         }`}
            >
              {BILL_CATEGORIES.map((category) => (
                <option
                  key={category.value}
                  value={category.value}
                  className="bg-slate-800 text-slate-200 py-2"
                >
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          {errors.category && (
            <p className="mt-2 text-sm text-red flex items-center gap-1">
              {errors.category}
            </p>
          )}
        </div>

        {/* Amount Field */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              <DollarSign size={18} />
            </div>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className={`input-control pl-10 ${
                errors.amount ? "border-red" : "border-slate-700"
              }`}
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>
          {errors.amount && (
            <p className="mt-2 text-sm text-red flex items-center gap-1">
              {errors.amount}
            </p>
          )}
        </div>

        {/* Date Field */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              <Calendar size={18} />
            </div>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`input-control pl-10 ${
                errors.date ? "border-red" : "border-slate-700"
              }`}
            />
          </div>
          {errors.date && (
            <p className="mt-2 text-sm text-red flex items-center gap-1">
              {errors.date}
            </p>
          )}
        </div>

        {/* Error Message */}
        {errors.submit && (
          <div className="p-3 rounded-lg bg-red-900/20 border border-red/20 text-red text-sm">
            {errors.submit}
          </div>
        )}

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="btn bg-slate-700 hover:bg-slate-600 text-slate-200"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin inline-block h-4 w-4 border-2 border-white/20 border-t-white rounded-full mr-2" />
                {initialData ? "Updating..." : "Adding..."}
              </>
            ) : initialData ? (
              "Update Bill"
            ) : (
              "Add Bill"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BillForm;
