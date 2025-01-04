import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { selectFilteredBills } from "../../../redux/features/bills/selectors";

const formatCurrency = (value) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
};

const BillChart = () => {
  const bills = useSelector(selectFilteredBills);

  const chartData = useMemo(() => {
    return bills
      .map((bill) => ({
        date: new Date(bill.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        amount: Number(bill.amount),
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [bills]);

  const { maxAmount, minAmount, trend } = useMemo(() => {
    if (chartData.length < 2) return { maxAmount: 0, minAmount: 0, trend: 0 };

    const amounts = chartData.map((d) => d.amount);
    const max = Math.max(...amounts);
    const min = Math.min(...amounts);
    const firstAmount = amounts[0];
    const lastAmount = amounts[amounts.length - 1];
    const trendPercentage = ((lastAmount - firstAmount) / firstAmount) * 100;

    return {
      maxAmount: max,
      minAmount: min,
      trend: trendPercentage,
    };
  }, [chartData]);

  return (
    <div className="rounded-2xl bg-gray-800/50 backdrop-blur-lg border border-white/50">
      <div className="p-4 md:p-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col justify-center md:flex-row items-center gap-4">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold text-slate-200 flex items-center gap-2">
              Monthly Spending Analysis
            </h2>
          </div>
        </div>

        {/* Chart Section */}
        <div className="h-[300px] md:h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#9333ea" stopOpacity={0} />
                </linearGradient>
              </defs>

              {/* New Grid with soft lines */}
              <CartesianGrid
                strokeDasharray="4 4"
                stroke="#9ca3af" /* Light gray for grid lines */
                vertical={false}
              />

              {/* Customizing the X Axis */}
              <XAxis
                dataKey="date"
                stroke="#f3f4f6" /* Light color for axis line */
                tick={{ fill: "#f3f4f6", fontSize: 14 }}
                tickLine={{ stroke: "#4b5563" }}
                axisLine={{ stroke: "#4b5563" }}
                tickMargin={15}
                minTickGap={10}
              />

              {/* Customizing the Y Axis */}
              <YAxis
                stroke="#f3f4f6"
                tick={{ fill: "#f3f4f6", fontSize: 14 }}
                tickLine={{ stroke: "#4b5563" }}
                axisLine={{ stroke: "#4b5563" }}
                tickFormatter={formatCurrency}
                tickMargin={15}
                width={70}
              />

              {/* Tooltip Customization */}
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937" /* Dark gray background */,
                  border: "1px solid #4b5563",
                  borderRadius: "12px" /* Round corners */,
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)" /* Soft shadow */,
                  padding: "15px",
                }}
                itemStyle={{
                  color: "#f3f4f6",
                  fontSize: "14px",
                }}
                labelStyle={{
                  color: "#d1d5db",
                  marginBottom: "8px",
                  fontSize: "12px",
                }}
                formatter={(value) => [`${formatCurrency(value)}`, "Amount"]}
                labelFormatter={(label) => `Date: ${label}`}
              />

              {/* Area Chart with Gradient */}
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#9333ea" /* Bold purple stroke */
                strokeWidth={3}
                fill="url(#colorAmount)"
                dot={{
                  fill: "#9333ea",
                  strokeWidth: 2,
                  r: 5,
                  stroke: "#581c87" /* Dark purple for the dot border */,
                }}
                activeDot={{
                  r: 7,
                  fill: "#9333ea",
                  stroke: "#581c87",
                  strokeWidth: 3,
                  shadow: "0px 0px 15px rgba(0, 0, 0, 0.6)" /* Soft glow */,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Empty State */}
        {chartData.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800/50 backdrop-blur-sm rounded-2xl">
            <div className="text-center text-slate-400">
              <p className="text-lg font-medium">No data available</p>
              <p className="text-sm">Add some bills to see the trend</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillChart;
