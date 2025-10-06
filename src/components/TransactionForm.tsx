import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 as uuidv4 } from "uuid";
import { transactionSchema } from "../utils/validationSchema";
import { Transaction, TransactionFormData } from "../types/transaction";

interface TransactionFormProps {
  addTransaction: (tx: Omit<Transaction, "id">) => void;
  hasIncome: boolean;
}

export const TransactionForm = ({
  addTransaction,
  hasIncome,
}: TransactionFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<TransactionFormData>({
    resolver: yupResolver(transactionSchema),
    mode: "onChange", // <-- validate fields as user types
    defaultValues: {
      title: "",
      amount: 0,
      type: "" as any,
      category: "",
    },
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

  const selectedType = watch("type"); // watch the selected type

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      {/* Title */}
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

      {/* Amount */}
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

      {/* Type */}
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

      {/* Category */}
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

      {/* Submit button */}
      <button
        type="submit"
        disabled={!isValid || (selectedType === "expense" && !hasIncome)}
        className={`px-4 py-2 rounded-lg text-white transition-all ${
          !isValid || (selectedType === "expense" && !hasIncome)
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        Add Transaction
      </button>
    </form>
  );
};
