import { PlusCircle, TrendingUp, Wallet } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectTotalAmount } from "../../redux/features/bills/selectors";
import Modal from "../common/Modal";
import BillChart from "./utils/BillChart";
import BillFilters from "./utils/BillFilters";
import BillForm from "./utils/BillForm";
import { formatCurrency } from "../../utils/format";
import StatCard from "./StatCard";
import { Link } from "react-router-dom";



const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalAmount = useSelector(selectTotalAmount);
  const monthlyBudget = useSelector((state) => state.bills.monthlyBudget);

  return (
    <div className="min-h-screen bg-black px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-white bg-clip-text text-transparent mb-1">
              Bill Dashboard
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
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
            className="btn btn-primary text-2xl rounded-full"
          >
            <PlusCircle className="w-5 h-5" />
            Add New Bill
          </button>
          <Link to='/bills'
            className="btn bg-white/75 text-black backdrop-blur-lg border border-white/50 text-2xl rounded-full"
          >
            Show Bills
          </Link>
        </div>

        <BillFilters />
        <BillChart />

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <BillForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
