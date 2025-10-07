import React from "react";
import { Transaction } from "@/types/transaction";

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const TransactionItem = React.memo(
  ({
    transactionItem,
    onDelete,
  }: {
    transactionItem: Transaction;
    onDelete: (id: string) => void;
  }) => {
    const { title, category, date, id, amount, type } = transactionItem;

    return (
      <div
        className={`flex justify-between items-center p-3 sm:p-4 border border-gray-200 rounded-lg shadow-sm ${
          type === "income" ? "bg-green-50" : "bg-red-50"
        }`}
      >
        <div className="space-y-1">
          <p className="text-sm sm:text-base font-semibold text-gray-800">
            {title}
          </p>
          <p className="text-xs sm:text-sm text-gray-600">
            {category} •{" "}
            {new Date(date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <p
            className={`text-sm sm:text-base font-bold ${
              type === "income" ? "text-green-600" : "text-red-600"
            }`}
          >
            €{amount.toFixed(2)}
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
            className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
            aria-label={`Delete transaction ${title}`}
          >
            <span className="text-lg">×</span>
          </button>
        </div>
      </div>
    );
  }
);

export const TransactionList = React.memo(
  ({ transactions, onDelete }: TransactionListProps) => {
    if (transactions.length === 0) {
      return (
        <p className="text-center text-sm sm:text-base text-gray-500">
          No transactions yet. Add one to get started!
        </p>
      );
    }

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
