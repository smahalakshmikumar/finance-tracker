export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

export type TransactionFormData = Omit<Transaction, "id" | "date">;
