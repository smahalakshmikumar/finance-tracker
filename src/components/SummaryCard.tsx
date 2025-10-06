import React from 'react';

interface SummaryCardProps {
  title: string;
  amount: number;
  type: 'income' | 'expense' | 'balance';
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, type }) => {
  const bgColor =
    type === 'income' ? 'bg-green-200' :
    type === 'expense' ? 'bg-red-200' :
    'bg-blue-200';

  return (
    <div className={`p-4 rounded shadow flex-1 ${bgColor}`}>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-2xl font-bold">{amount.toFixed(2)} €</p>
    </div>
  );
};

export default SummaryCard;
