import { PlusCircle, TrendingUp, Wallet } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectTotalAmount } from "../../features/bills/selectors";
import Modal from "../common/Modal";
import BillChart from "./BillChart";
import BillFilters from "./BillFilters";
import BillForm from "./BillForm";
import BillList from "./BillList";
import { formatCurrency } from "../../utils/format";

const StatCard = ({ label, value, icon: Icon, type = "primary" }) => (
  <div className="stat-card">
    <div className="flex justify-between items-center gap-1">
      <div>
        <p className="stat-label">{label}</p>
        <p className={`stat-value ${type}`}>{value}</p>
      </div>
      <div className={`p-3 flex items-center justify-center rounded-xl bg-${type}-light/10`}>
        <Icon className={`w-6 h-6 text-${type}-light`} />
      </div>
    </div>
  </div>
);

const BillDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalAmount = useSelector(selectTotalAmount);
  const monthlyBudget = useSelector((state) => state.bills.monthlyBudget);

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-white bg-clip-text text-transparent">
              Bill Dashboard
            </h1>
            <p className="text-slate-300 mt-1">
              Manage and track your expenses
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
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
            className="btn btn-primary text-2xl"
          >
            <PlusCircle className="w-5 h-5" />
            Add New Bill
          </button>
        </div>

        <BillFilters />
        <BillChart />
        <BillList />

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <BillForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      </div>
    </div>
  );
};

export default BillDashboard;
