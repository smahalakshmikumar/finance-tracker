import React from 'react';
import { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  if (transactions.length === 0) return <p className="text-gray-500">No transactions yet.</p>;

  return (
    <div className="flex flex-col gap-2">
      {transactions.map(transaction => (
        <div
          key={transaction.id}
          className={`flex justify-between p-2 rounded shadow ${
            transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
          }`}
        >
          <div>
            <p className="font-semibold">{transaction.category}</p>
            <p className="text-sm text-gray-600">{transaction.date}</p>
          </div>
          <div className="font-bold">{transaction.amount.toFixed(2)} €</div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
