import React, { useState } from 'react';
import { Transaction, TransactionType } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface TransactionFormProps {
  addTransaction: (transaction: Transaction) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ addTransaction }) => {
  const [type, setType] = useState<TransactionType>('income');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !amount || !date) return;

    const newTransaction: Transaction = {
      id: uuidv4(),
      type,
      category,
      amount: Number(amount),
      date,
    };

    addTransaction(newTransaction);
    setCategory('');
    setAmount('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded shadow flex flex-col gap-2">
      <div className="flex gap-2">
        <select value={type} onChange={e => setType(e.target.value as TransactionType)} className="border p-2 rounded flex-1">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border p-2 rounded flex-1"
        />
      </div>
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          className="border p-2 rounded flex-1"
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="border p-2 rounded flex-1"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600">
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
