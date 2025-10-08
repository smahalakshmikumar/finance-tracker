import { Transaction } from "@/types/transaction";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  addTransactionThunk,
  clearTransactionsThunk,
  deleteTransactionThunk,
  fetchTransactions,
} from "../../store/thunks/transactionsThunk";
import { setError } from "../../store/slices/transactionsSlice";

export const useTransactions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const transactions = useSelector(
    (state: RootState) => state.transactions.items
  );
  const errorMessage = useSelector(
    (state: RootState) => state.transactions.error
  );
  const [isLoading, setIsLoading] = useState(true);

  // Auto-clear error message after 5 seconds
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => dispatch(setError(null)), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, dispatch]);

  // Fetch transactions on mount
  useEffect(() => {
    const loadTransactions = async () => {
      setIsLoading(true);
      await dispatch(fetchTransactions());
      setIsLoading(false);
    };
    loadTransactions();
  }, [dispatch]);

  const addTransaction = (newTx: Transaction) => {
    setIsLoading(true);
    dispatch(addTransactionThunk(newTx)).finally(() => setIsLoading(false));
  };

  const deleteTransaction = (id: string) => {
    setIsLoading(true);
    dispatch(deleteTransactionThunk(id)).finally(() => setIsLoading(false));
  };

  const clearData = () => {
    setIsLoading(true);
    dispatch(clearTransactionsThunk()).finally(() => setIsLoading(false));
  };

  return {
    transactions,
    errorMessage,
    isLoading,
    addTransaction,
    deleteTransaction,
    clearData,
  };
};
