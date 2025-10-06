import { useState } from 'react';
import { Transaction } from '../types';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import SummaryCard from '../components/SummaryCard';

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [transaction, ...prev]);
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Finance Tracker</h1>
      <div className="mb-6 flex gap-4">
        <SummaryCard title="Income" amount={totalIncome} type="income" />
        <SummaryCard title="Expense" amount={totalExpense} type="expense" />
        <SummaryCard title="Balance" amount={balance} type="balance" />
      </div>
      <TransactionForm addTransaction={addTransaction} />
      <TransactionList transactions={transactions} />
    </div>
  );
}
