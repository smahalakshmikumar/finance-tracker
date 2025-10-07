"use client";

import { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Transaction } from "@/types/transaction";

interface ChartData {
  name: string;
  value: number;
  type: Transaction["type"];
  [key: string]: any; // Index signature for Recharts compatibility
}

// Generate color based on transaction type
const generateColor = (type: Transaction["type"]): string => {
  const hue = type === "income" ? 120 + Math.random() * 100 : Math.random() * 20;
  const saturation = 70 + Math.random() * 10;
  const lightness = 50 + Math.random() * 10;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

// Transform transactions into chart data
const getChartData = (transactions: Transaction[]): ChartData[] => {
  return Object.values(
    transactions.reduce((acc, { category, amount, type }) => {
      acc[category] = acc[category] || { name: category, value: 0, type };
      acc[category].value += amount;
      return acc;
    }, {} as Record<string, ChartData>)
  );
};

export default function SummaryPage() {
  const transactions = useSelector((state: RootState) => state.transactions.items);

  // Memoize chart data and colors
  const chartData = useMemo(() => getChartData(transactions), [transactions]);
  const colors = useMemo(
    () => chartData.map((entry) => generateColor(entry.type)),
    [chartData]
  );

  // Calculate total amount for display
  const totalAmount = useMemo(
    () => transactions.reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  // Handle empty state
  if (transactions.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Expense Breakdown</h1>
        <p className="text-gray-600">No transactions available. Add some transactions to see the breakdown.</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Expense Breakdown</h1>
      <div className="mb-4">
        <p className="text-lg text-gray-700">Total Amount: ${totalAmount.toFixed(2)}</p>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}