import { Transaction } from "@/types/transaction";
import { AppDispatch, RootState } from "../../store";
import {
  addTransaction as addTransactionRedux,
  removeTransaction,
  setTransactions,
  setError,
} from "../slices/transactionsSlice";

const BASE_API_URL = `/api/transactions/`;

// Thunk to fetch all transactions
export const fetchTransactions = () => async (dispatch: AppDispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}`);
    if (!res.ok) throw new Error("Failed to fetch transactions");
    const data: Transaction[] = await res.json();
    dispatch(setTransactions(data));
    dispatch(setError(null));
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch transactions";
    dispatch(setError(message));
  }
};

// Thunk to add a transaction
export const addTransactionThunk =
  (newTx: Transaction) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const previousTransactions = [...getState().transactions.items];
    dispatch(addTransactionRedux(newTx)); //(optimistic update)

    try {
      const res = await fetch(`${BASE_API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTx),
      });
      if (!res.ok) throw new Error("Failed to add transaction");
      dispatch(setError(null));
    } catch (err: unknown) {
      dispatch(setTransactions(previousTransactions));
      const message =
        err instanceof Error ? err.message : "Failed to add transaction";
      dispatch(setError(message));
    }
  };

// Thunk to delete a transaction (optimistic update)
export const deleteTransactionThunk =
  (id: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const previousTransactions = [...getState().transactions.items];
    dispatch(removeTransaction(id));

    try {
      const res = await fetch(`${BASE_API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete transaction");
      dispatch(setError(null));
    } catch (err: unknown) {
      dispatch(setTransactions(previousTransactions));
      const message =
        err instanceof Error ? err.message : "Failed to delete transaction";
      dispatch(setError(message));
    }
  };

// Thunk to clear all transactions
export const clearTransactionsThunk = () => async (dispatch: AppDispatch) => {
  dispatch(setTransactions([]));
  try {
    const res = await fetch(`${BASE_API_URL}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to clear transactions");
    dispatch(setError(null));
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to clear transactions";
    dispatch(setError(message));
  }
};
