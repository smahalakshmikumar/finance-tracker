import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { RootState } from "../../store";

const generateColor = (
  type: string,
  
) => {
  // Pick hue range based on type
  const hue =
    type === "income"
      ? 120 + Math.random() * 100 // greens/blues
      : 0 + Math.random() * 20; // reds/pinks

  const saturation = 70 + Math.random() * 10; // 70-80%
  const lightness = 50 + Math.random() * 10; // 50-60%

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export default function SummaryPage() {
  const transactions = useSelector(
    (state: RootState) => state.transactions.items
  );

  const data = Object.values(
    transactions.reduce((acc, t) => {
      acc[t.category] = acc[t.category] || {
        name: t.category,
        value: 0,
        type: t.type,
      };
      acc[t.category].value += t.amount;
      return acc;
    }, {} as Record<string, { name: string; value: number; type: string }>)
  );

  //const COLORS = generateColors(data.length);

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
          {data.map((entry, i) => (
            <Cell key={i} fill={generateColor(entry.type)} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
