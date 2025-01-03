import { PiggyBank, TrendingUp, Wallet } from "lucide-react";
import { useSelector } from "react-redux";
import { selectTotalAmount } from "../../../features/bills/selectors";
import { formatCurrency } from "../../../utils/format";
import Card from "../../common/Card";

const BillStats = () => {
  const totalAmount = useSelector(selectTotalAmount);
  const monthlyBudget = useSelector((state) => state.bills.monthlyBudget);
  const budgetUsage = (totalAmount / monthlyBudget) * 100;

  const stats = [
    {
      title: "Total Expenses",
      value: formatCurrency(totalAmount),
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Monthly Budget",
      value: formatCurrency(monthlyBudget),
      icon: Wallet,
      color: "text-green",
      bgColor: "bg-green/10",
    },
    {
      title: "Budget Usage",
      value: `${budgetUsage.toFixed(1)}%`,
      icon: PiggyBank,
      color: budgetUsage > 90 ? "text-red" : "text-yellow",
      bgColor: budgetUsage > 90 ? "bg-red/10" : "bg-yellow/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-sm">{stat.title}</p>
              <p className={`text-2xl font-bold mt-2 ${stat.color}`}>
                {stat.value}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default BillStats;
