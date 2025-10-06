import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { RootState } from "../../store";

const generateColors = (num: number) => {
  const colors = [];
  for (let i = 0; i < num; i++) {
    const hue = (i * 360) / num; // spread around the color wheel
    colors.push(`hsl(${hue}, 70%, 50%)`);
  }
  return colors;
};

export default function SummaryPage() {
  const transactions = useSelector(
    (state: RootState) => state.transactions.items
  );

  const data = Object.values(
    transactions.reduce((acc, t) => {
      acc[t.category] = acc[t.category] || { name: t.category, value: 0 };
      acc[t.category].value += t.amount;
      return acc;
    }, {} as Record<string, { name: string; value: number }>)
  );

  const COLORS = generateColors(data.length);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Expense Breakdown</h1>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
