import { useDispatch, useSelector } from "react-redux";
import {
  setBudget,
  setCategory,
} from "../../../redux/features/bills/billsSlice";
import { CATEGORIES } from "../../../utils/constants";
import { useLocation } from "react-router-dom"; // Import useLocation

const BillFilters = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.bills.selectedCategory);
  const monthlyBudget = useSelector((state) => state.bills.monthlyBudget);
  const location = useLocation(); // Get the current route

  // Prevent scroll from changing number input value
  const handleWheel = (e) => {
    e.target.blur();
  };

  return (
    <>
      {/* Category Filter */}
      <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <div className="flex-1">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-200 mb-2">
              Filter by Category
            </label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => dispatch(setCategory(e.target.value))}
                className="w-full bg-gray-800 text-gray-200 border border-gray-700/50 
                           rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 
                           hover:border-gray-600 transition-colors"
              >
                {CATEGORIES.map((category) => (
                  <option
                    key={category.value}
                    value={category.value}
                    className="bg-gray-800/50 text-gray-200 py-2 hover:bg-purple-600 hover:text-white"
                  >
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Budget Input - Only show on BillListPage */}
      {location.pathname === "/bills" && (
        <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-4 md:p-6 mt-4">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <div className="flex-1">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-200 mb-2">
                Monthly Budget
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  $
                </span>
                <input
                  type="number"
                  value={monthlyBudget}
                  onChange={(e) => dispatch(setBudget(Number(e.target.value)))}
                  onWheel={handleWheel}
                  className="w-full bg-gray-800 text-gray-200 border border-gray-700/50 
                             rounded-lg pl-8 pr-4 py-2.5 focus:outline-none focus:ring-2 
                             focus:ring-purple-500 hover:border-gray-600 transition-colors 
                             placeholder-gray-500"
                  placeholder="Enter budget amount"
                  min="0"
                  step="100"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BillFilters;
