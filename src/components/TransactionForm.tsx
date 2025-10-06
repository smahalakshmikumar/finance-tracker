import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 as uuidv4 } from "uuid";
import { transactionSchema } from "../utils/validationSchema";
import { Transaction, TransactionFormData } from "../types/transaction";

interface TransactionFormProps {
  addTransaction: (transaction: Transaction) => void;
}

export const TransactionForm = ({ addTransaction }: TransactionFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: yupResolver(transactionSchema),
  });

  const onSubmit = (data: TransactionFormData) => {
    const newTransaction: Transaction = {
      ...data,
      id: uuidv4(),
      date: new Date().toISOString(),
    };
    addTransaction(newTransaction);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          {...register("title")}
          className="border rounded-lg w-full p-2"
          placeholder="Enter title"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Amount (€)</label>
        <input
          type="number"
          {...register("amount")}
          className="border rounded-lg w-full p-2"
        />
        {errors.amount && (
          <p className="text-red-500 text-sm">{errors.amount.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Type</label>
        <select {...register("type")} className="border rounded-lg w-full p-2">
          <option value="">Select</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        {errors.type && (
          <p className="text-red-500 text-sm">{errors.type.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Category</label>
        <input
          {...register("category")}
          className="border rounded-lg w-full p-2"
          placeholder="e.g. Food, Salary"
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Add Transaction
      </button>
    </form>
  );
};
