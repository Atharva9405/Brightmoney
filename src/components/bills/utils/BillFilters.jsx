import { DollarSign, Filter } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setBudget, setCategory } from "../../../features/bills/billsSlice";
import { CATEGORIES } from "../../../utils/constants";

const BillFilters = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.bills.selectedCategory);
  const monthlyBudget = useSelector((state) => state.bills.monthlyBudget);

  // Prevent scroll from changing number input value
  const handleWheel = (e) => {
    e.target.blur();
  };

  return (
    <>
      <div className="glass-effect rounded-2xl p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <div className="flex-1">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-2">
              <Filter className="w-4 h-4" />
              Filter by Category
            </label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => dispatch(setCategory(e.target.value))}
                className="w-full custom-select bg-slate-800/50 text-slate-200 border border-slate-700/50
                         rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50
                         hover:border-slate-600/50 transition-colors"
              >
                {CATEGORIES.map((category) => (
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
          </div>

          <div className="flex-1">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-2">
              <DollarSign className="w-4 h-4" />
              Monthly Budget
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                $
              </span>
              <input
                type="number"
                value={monthlyBudget}
                onChange={(e) => dispatch(setBudget(Number(e.target.value)))}
                onWheel={handleWheel}
                className="w-full bg-slate-800/50 text-slate-200 border border-slate-700/50
                         rounded-lg pl-8 pr-4 py-2.5 focus:outline-none focus:ring-2 
                         focus:ring-primary/50 hover:border-slate-600/50 transition-colors
                         placeholder-slate-500"
                placeholder="Enter budget amount"
                min="0"
                step="100"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BillFilters;
