"use client";

import { useState, useMemo } from "react";
import { SummaryCard } from "../components/SummaryCard";
import { TransactionForm } from "../components/TransactionForm";
import { TransactionList } from "../components/TransactionList";
import { Transaction } from "@/types/transaction";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (newTx: Transaction) => {
    setTransactions((prev) => [...prev, newTx]);
  };

  const totalIncome = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const totalExpense = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">
        Personal Finance Tracker
      </h1>

      <div className="grid grid-cols-2 gap-4">
        <SummaryCard title="Income" amount={totalIncome} type="income" />
        <SummaryCard title="Expense" amount={totalExpense} type="expense" />
      </div>

      <TransactionForm addTransaction={addTransaction} />
      <TransactionList transactions={transactions} />
    </main>
  );
}
