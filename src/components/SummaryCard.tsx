interface SummaryCardProps {
    title: string;
    amount: number;
    type: "income" | "expense";
  }
  
  export const SummaryCard = ({ title, amount, type }: SummaryCardProps) => (
    <div
      className={`rounded-2xl p-4 shadow-md ${
        type === "income" ? "bg-green-100" : "bg-red-100"
      }`}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold mt-2">€{amount.toFixed(2)}</p>
    </div>
  );
  