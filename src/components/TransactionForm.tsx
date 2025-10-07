import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 as uuidv4 } from "uuid";

import { transactionSchema } from "../utils/validationSchema";
import { Transaction, TransactionFormData } from "../types/transaction";
import React from "react";

interface TransactionFormProps {
  addTransaction: (tx: Omit<Transaction, "id">) => Promise<void>;
  //hasIncome: boolean;
  disabled: boolean;
}

const styles = {
  input: "border border-gray-300 rounded-lg w-full p-2",
  error: "text-red-500 text-sm",
  button: {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition-all",
    disabled: "bg-gray-400 cursor-not-allowed text-white rounded-lg px-4 py-2",
  },
};

export const TransactionForm = React.memo(
  ({ addTransaction, disabled }: TransactionFormProps) => {
    const {
      register,
      handleSubmit,
      reset,
      watch,
      formState: { errors, isValid },
    } = useForm<TransactionFormData>({
      resolver: yupResolver(transactionSchema),
      mode: "onChange",
      defaultValues: {
        title: "",
        amount: 0,
        category: "",
        type: undefined,
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

    const selectedType = watch("type");

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200"
      >
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm sm:text-base font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            {...register("title")}
            className="w-full p-3 sm:p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            disabled={disabled}
            placeholder="Enter title"
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && (
            <p
              id="title-error"
              className="text-red-600 text-xs sm:text-sm mt-1"
            >
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Amount */}
        <div>
          <label
            htmlFor="amount"
            className="block text-sm sm:text-base font-medium text-gray-700"
          >
            Amount (€)
          </label>
          <input
            id="amount"
            type="number"
            min="0"
            step="0.01"
            {...register("amount")}
            className="w-full p-3 sm:p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            disabled={disabled}
            aria-describedby={errors.amount ? "amount-error" : undefined}
          />
          {errors.amount && (
            <p
              id="amount-error"
              className="text-red-600 text-xs sm:text-sm mt-1"
            >
              {errors.amount.message}
            </p>
          )}
        </div>

        {/* Type */}
        <div>
          <label
            htmlFor="type"
            className="block text-sm sm:text-base font-medium text-gray-700"
          >
            Type
          </label>
          <select
            id="type"
            {...register("type")}
            className="w-full p-3 sm:p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            disabled={disabled}
            aria-describedby={errors.type ? "type-error" : undefined}
          >
            <option value="" disabled>
              Select type
            </option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          {errors.type && (
            <p id="type-error" className="text-red-600 text-xs sm:text-sm mt-1">
              {errors.type.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm sm:text-base font-medium text-gray-700"
          >
            Category
          </label>
          <input
            id="category"
            {...register("category")}
            className="w-full p-3 sm:p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            disabled={disabled}
            placeholder="e.g., Food, Salary"
            aria-describedby={errors.category ? "category-error" : undefined}
          />
          {errors.category && (
            <p
              id="category-error"
              className="text-red-600 text-xs sm:text-sm mt-1"
            >
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={disabled || !isValid}
          className={`w-full sm:w-auto px-4 py-3 rounded-lg text-white font-medium transition-colors ${
            !isValid
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {disabled ? "Adding..." : "Add Transaction"}
        </button>
      </form>
    );
  }
);
