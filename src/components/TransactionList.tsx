import { Transaction } from "@/types/transaction";

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList = ({ transactions }: TransactionListProps) => {
  if (transactions.length === 0)
    return <p className="text-gray-500">No transactions yet.</p>;

  return (
    <div className="space-y-3 w-full">
      {transactions.map((t) => (
        <div
          key={t.id}
          className={`border rounded-xl p-3 ${
            t.type === "income" ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <p className="font-semibold">{t.title}</p>
          <p>€{t.amount.toFixed(2)}</p>
          <p className="text-sm text-gray-600">
            {t.category} • {new Date(t.date).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};
