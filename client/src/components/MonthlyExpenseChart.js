import "./MonthlyExpenseChart.css";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function MonthlyExpenseChart({ expenses = [] }) {
    const [selectedMonth, setSelectedMonth] = useState("All");
    const monthlyData = {};
  

  expenses.forEach((item) => {
    const date = new Date(item.expenseDate);

    const month = date.toLocaleString("default", {
      month: "short",
    });

    monthlyData[month] =
      (monthlyData[month] || 0) + Number(item.amount);
  });

  const data = Object.keys(monthlyData).map((month) => ({
    month,
    amount: monthlyData[month],
  }));

  return (
    <div className="monthly-chart-container">
      <div className="monthly-chart-header">
  <h3 className="monthly-chart-title">
  Monthly Expenses
</h3>
  <select
  className="month-dropdown"
  value={selectedMonth}
  onChange={(e) => setSelectedMonth(e.target.value)}
>
    <option value="All">All Months</option>
    <option value="Jan">Jan</option>
    <option value="Feb">Feb</option>
    <option value="Mar">Mar</option>
    <option value="Apr">Apr</option>
    <option value="May">May</option>
    <option value="Jun">Jun</option>
    <option value="Jul">Jul</option>
    <option value="Aug">Aug</option>
    <option value="Sep">Sep</option>
    <option value="Oct">Oct</option>
    <option value="Nov">Nov</option>
    <option value="Dec">Dec</option>
  </select>
</div>
      <ResponsiveContainer>
        <LineChart
            data={data}
            margin={{
                top: 5,
                right: 20,
                left: 0,
                bottom: 40,
            }}
    >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month"/>

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="amount"
            stroke="#7c77df"
            strokeWidth={2}
            dot={{ r: 5 }}
             activeDot={{ r: 9 }}
        />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyExpenseChart;