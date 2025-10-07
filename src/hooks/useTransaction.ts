import { Transaction } from "@/types/transaction";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  setTransactions,
  removeTransaction,
  addTransaction as addTransactionRedux,
} from "../../store/transactionsSlice";

// Custom hook for transaction management
export const useTransactions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const transactions = useSelector(
    (state: RootState) => state.transactions.items
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Auto-clear error message after 5 seconds
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  // Fetch transactions on mount
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/transactions");
        if (!res.ok) throw new Error("Failed to fetch transactions");
        const data = (await res.json()) as Transaction[];
        dispatch(setTransactions(data));
      } catch (err: any) {
        setErrorMessage(err.message || "Failed to load transactions");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, [dispatch]);

  const addTransaction = async (newTx: Omit<Transaction, "id">) => {
    const optimisticTransaction: Transaction = {
      ...newTx,
      id: `temp-${Date.now()}`,
    };
    const previousTransactions = [...transactions];
    dispatch(addTransactionRedux(optimisticTransaction));

    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTx),
      });
      if (!res.ok) throw new Error("Failed to add transaction");
      const data = (await res.json()) as Transaction;
      dispatch(removeTransaction(optimisticTransaction.id));
      dispatch(addTransactionRedux(data));
      setErrorMessage(null);
    } catch (err: any) {
      dispatch(setTransactions(previousTransactions));
      setErrorMessage(err.message || "Failed to add transaction");
    }
  };

  const deleteTransaction = async (id: string) => {
    const previousTransactions = [...transactions];
    dispatch(removeTransaction(id));

    try {
      const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete transaction");
      setErrorMessage(null);
    } catch (err: any) {
      dispatch(setTransactions(previousTransactions));
      setErrorMessage(err.message || "Failed to delete transaction");
    }
  };

  const clearData = async () => {
    dispatch(setTransactions([])); // Clear transactions in state
    setErrorMessage(null);
    try {
      setIsLoading(true);
      const res = await fetch("/api/transactions", {
        method: "DELETE", 
      });
      if (!res.ok) throw new Error("Failed to clear transactions");
      
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to clear transactions");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    transactions,
    errorMessage,
    setErrorMessage,
    isLoading,
    addTransaction,
    deleteTransaction,
    clearData,
  };
};
