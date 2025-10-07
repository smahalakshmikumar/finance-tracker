import React from "react";

interface SummaryCardProps {
  title: string;
  amount: number;
  type: "income" | "expense";
  currency?: string; // Added for flexibility
}

export const SummaryCard = React.memo(
  ({ title, amount, type, currency = "€" }: SummaryCardProps) => {
    const typeStyles = {
      income: "bg-green-100 border-green-200",
      expense: "bg-red-100 border-red-200",
    } as const;

    return (
      <div
        role="region"
        aria-label={`${type} summary: ${title}`}
        className={`rounded-2xl p-4 shadow-md border ${typeStyles[type]}`}
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold mt-2">
          {currency}
          {amount.toFixed(2)}
        </p>
      </div>
    );
  }
);
