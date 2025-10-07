import React from "react";

interface SummaryCardProps {
  title: string;
  amount: number;
  type: "income" | "expense";
  currency?: string; // Defaults to "€"
}

export const SummaryCard = React.memo(
  ({ title, amount, type, currency = "€" }: SummaryCardProps) => {
    const typeStyles = {
      income: "bg-green-50 border-green-300 hover:bg-green-100",
      expense: "bg-red-50 border-red-300 hover:bg-red-100",
    } as const;

    return (
      <div
        aria-labelledby={`${title.toLowerCase()}-title`}
        className={`rounded-lg p-3 sm:p-4 shadow-sm border ${typeStyles[type]}`}
      >
        <h3
          id={`${title.toLowerCase()}-title`}
          className="text-base sm:text-lg font-semibold text-gray-700"
        >
          {title}
        </h3>
        <p className="text-lg sm:text-2xl font-bold mt-2">
          {currency}
          {amount.toFixed(2)}
        </p>
      </div>
    );
  }
);
