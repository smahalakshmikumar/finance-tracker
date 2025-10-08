import { Transaction } from "@/types/transaction";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TransactionsState {
  items: Transaction[];
  error: string | null;
}

const initialState: TransactionsState = {
  items: [],
  error: null,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.items.push(action.payload);
    },
    removeTransaction: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.items = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { addTransaction, removeTransaction, setTransactions, setError } = transactionsSlice.actions;
export default transactionsSlice.reducer;