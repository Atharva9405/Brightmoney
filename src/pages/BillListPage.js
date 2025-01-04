import { Link } from "react-router-dom";
import StatCard from "../components/bills/StatCard";
import BillList from "../components/bills/utils/BillList";
import { formatCurrency } from "../utils/format";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectTotalAmount } from "../redux/features/bills/selectors";
import { PlusCircle, TrendingUp, Wallet, Home } from "lucide-react";
import BillFilters from "../components/bills/utils/BillFilters";
import Modal from "../components/common/Modal";
import BillForm from "../components/bills/utils/BillForm";

const BillListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalAmount = useSelector(selectTotalAmount);
  const monthlyBudget = useSelector((state) => state.bills.monthlyBudget);

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white">
      {/* Header with Home Button */}
      <div className="w-full flex justify-evenly items-center px-8 py-4">
        <div>
          <h1 className="text-4xl font-bold">Your Bills</h1>
          <p className="mt-2 text-lg text-gray-300">
            Review and manage your bill details below
          </p>
        </div>
        {/* Home Button */}
        <Link
          to="/"
          className="flex items-center gap-2 bg-primary text-black py-2 px-4 rounded-lg hover:bg-primary-dark transition-all"
        >
          <Home className="w-5 h-5" />
          Home
        </Link>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-3 gap-5 my-5 px-8 w-full max-w-6xl">
        <StatCard
          label="Total Expenses"
          value={formatCurrency(totalAmount)}
          icon={TrendingUp}
          type="primary"
        />
        <StatCard
          label="Monthly Budget"
          value={formatCurrency(monthlyBudget)}
          icon={Wallet}
          type="success"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary text-2xl rounded-full flex items-center gap-2 justify-center"
        >
          <PlusCircle className="w-5 h-5" />
          Add New Bill
        </button>
      </div>

      {/* Filters Section */}
      <div className="my-5 grid grid-cols-2 gap-5 h-[15vh] px-8 w-full max-w-6xl">
        <BillFilters />
      </div>

      {/* Bills List Section */}
      <div className="w-full max-w-6xl my-6 px-8">
        <BillList />
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <BillForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default BillListPage;
