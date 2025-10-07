import React from "react";
import { Transaction } from "@/types/transaction";

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const styles = {
  card: "border border-gray-200 rounded-xl p-3", // Specific border color
  error: "text-red-500 text-sm",
  deleteButton: "text-red-500 hover:text-red-600",
};

const TransactionItem = React.memo(
  ({
    transactionItem,
    onDelete,
  }: {
    transactionItem: Transaction;
    onDelete: (id: string) => void;
  }) => {
    const { title, category, date, id, amount } = transactionItem;

    return (
      <div
        className={`${styles.card} ${
          transactionItem.type === "income" ? "bg-green-50" : "bg-red-50"
        }`}
      >
        <p className="font-semibold">{title}</p>
        <p>€{amount.toFixed(2)}</p>
        <p className="text-sm text-gray-600">
          {category} • {new Date(date).toLocaleDateString()}
        </p>
        <button
          onClick={() => {
            if (window.confirm(`Delete transaction "${title}"?`)) {
              try {
                onDelete(id);
              } catch (err) {
                alert(
                  `Failed to delete transaction: ${
                    err instanceof Error ? err.message : "Unknown error"
                  }`
                );
              }
            }
          }}
          className={styles.deleteButton}
          aria-label={`Delete transaction ${title}`}
        >
          Delete
        </button>
      </div>
    );
  }
);

export const TransactionList = React.memo(
  ({ transactions, onDelete }: TransactionListProps) => {
    if (transactions.length === 0)
      return (
        <p className="text-gray-500">
          No transactions yet. Add one to get started!
        </p>
      );

    return (
      <div className="space-y-3 w-full">
        {transactions.map((transactionItem) => (
          <TransactionItem
            key={transactionItem.id}
            transactionItem={transactionItem}
            onDelete={onDelete}
          />
        ))}
      </div>
    );
  }
);
