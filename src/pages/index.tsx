"use client";

import { useMemo, useState } from "react";
import { SummaryCard } from "../components/SummaryCard";
import { TransactionForm } from "../components/TransactionForm";
import { TransactionList } from "../components/TransactionList";
import { useRouter } from "next/router";
import { Transaction } from "@/types/transaction";
import { useTransactions } from "@/hooks/useTransaction";

export default function Home() {
  const router = useRouter();
  const {
    transactions,
    errorMessage,
    setErrorMessage,
    isLoading,
    addTransaction,
    deleteTransaction,
    clearData,
  } = useTransactions();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddTransaction = async (newTx: Omit<Transaction, "id">) => {
    if (!transactions.some((t) => t.type === "income") && newTx.type !== "expense") {
      setErrorMessage("Please add your income first.");
      return;
    }
    setIsSubmitting(true);
    try {
      await addTransaction(newTx);
    } catch (error) {
      console.error("addTransaction error:", error); // Log for debugging
      setErrorMessage(`Failed to add transaction: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsSubmitting(false); // Always reset isSubmitting
    }
  };

  const handleRemoveTransaction = async (id: string) => {
    setIsSubmitting(true);
    try {
      await deleteTransaction(id);
    } catch (error) {
      setErrorMessage("Failed to delete transaction.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearData = async () => {
    if (window.confirm("Are you sure you want to clear all transactions?")) {
      await clearData();
    }
  };

  const handleViewSummary = () => {
    if (transactions.length === 0) {
      setErrorMessage("No transactions available to view summary.");
      return;
    }
    router.push("/summary");
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
  const totalBalance = useMemo(
    () => totalIncome - totalExpense,
    [totalIncome, totalExpense]
  );

  const hasSummary = transactions.length > 0;
  const hasIncome = transactions.some((t) => t.type === "income");

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">
        Personal Finance Tracker
      </h1>

      {isLoading ? (
        <p>Loading transactions...</p>
      ) : (
        <>
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <span>{errorMessage}</span>
              <button
                onClick={() => setErrorMessage(null)}
                className="absolute top-0 right-0 px-4 py-3"
                aria-label="Dismiss error message"
              >
                <span className="text-red-700">&times;</span>
              </button>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4">
            <SummaryCard title="Income" amount={totalIncome} type="income" />
            <SummaryCard title="Expense" amount={totalExpense} type="expense" />
            <SummaryCard
              title="Balance"
              amount={totalBalance}
              type={totalBalance >= 0 ? "income" : "expense"}
            />
          </div>

          <TransactionForm
            addTransaction={handleAddTransaction}
            hasIncome={hasIncome}
            disabled={isSubmitting}
          />
          <TransactionList
            transactions={transactions}
            onDelete={handleRemoveTransaction}
          />

          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={handleClearData}
              className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              Clear Data
            </button>
            <button
              onClick={handleViewSummary}
              disabled={!hasSummary}
              className="px-4 py-2 rounded-md text-white transition-all disabled:bg-gray-400 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700"
              title={
                !hasSummary ? "Add transactions to view summary" : undefined
              }
            >
              View Summary
            </button>
          </div>
        </>
      )}
    </main>
  );
}
