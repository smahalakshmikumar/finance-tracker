"use client";

import { useMemo } from "react";
import { SummaryCard } from "../components/SummaryCard";
import { TransactionForm } from "../components/TransactionForm";
import { TransactionList } from "../components/TransactionList";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { addTransaction, removeTransaction } from "../../store/transactionsSlice";
import { Transaction } from "@/types/transaction";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // Use Redux state instead of local state
  const transactions = useSelector(
    (state: RootState) => state.transactions.items
  );

  const handleViewSummary = () => {
    if (transactions.length === 0) {
      alert("No transactions yet to show in summary.");
      return;
    }
    router.push("/summary");
  };

  const handleAddTransaction = (newTx: Omit<Transaction, "id">) => {
    if (transactions.length === 0 && newTx.type !== "income") {
      alert("Please add your income first.");
      return;
    }
    dispatch(addTransaction({ id: uuidv4(), ...newTx }));
  };

  const handleRemoveTransaction = (id: string) => {
    dispatch(removeTransaction(id));
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

  const totalBalance = useMemo(() => totalIncome - totalExpense, [totalIncome, totalExpense]);
  const hasSummary = transactions.some((t) => t.type === "expense" || t.type === "income");
  const hasIncome = transactions.some((t) => t.type === "income");


  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">
        Personal Finance Tracker
      </h1>

      <div className="grid grid-cols-3 gap-4">
        <SummaryCard title="Income" amount={totalIncome} type="income" />
        <SummaryCard title="Expense" amount={totalExpense} type="expense" />
        <SummaryCard title="Balance" amount={totalBalance} type={totalBalance >= 0 ? "income" : "expense"} />
      </div>

      <TransactionForm addTransaction={handleAddTransaction}hasIncome={hasIncome} />
      <TransactionList
        transactions={transactions}
        onDelete={handleRemoveTransaction}
      />

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleViewSummary}
          disabled={!hasSummary} 
          className={`px-4 py-2 rounded-md text-white transition-all ${
            !hasSummary
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}        >
          View Summary
        </button>
      </div>
    </main>
  );
}
