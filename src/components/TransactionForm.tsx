import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 as uuidv4 } from "uuid";

import { transactionSchema } from "../utils/validationSchema";
import { Transaction, TransactionFormData } from "../types/transaction";
import React from "react";

interface TransactionFormProps {
  addTransaction: (tx: Omit<Transaction, "id">) => Promise<void>;
  hasIncome: boolean;
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
  ({ addTransaction, hasIncome, disabled }: TransactionFormProps) => {
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">
            Title
          </label>
          <input
            id="title"
            {...register("title")}
            className={styles.input}
            disabled={disabled}
            placeholder="Enter title"
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && (
            <p id="title-error" className={styles.error}>
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Amount */}
        <div>
          <label htmlFor="amount" className="block mb-1 font-medium">
            Amount (€)
          </label>
          <input
            id="amount"
            type="number"
            min="0"
            step="0.01"
            {...register("amount")}
            disabled={disabled}
            className={styles.input}
            aria-describedby={errors.amount ? "amount-error" : undefined}
          />
          {errors.amount && (
            <p id="amount-error" className={styles.error}>
              {errors.amount.message}
            </p>
          )}
        </div>

        {/* Type */}
        <div>
          <label htmlFor="type" className="block mb-1 font-medium">
            Type
          </label>
          <select
            id="type"
            {...register("type")}
            disabled={disabled}
            className={styles.input}
            aria-describedby={errors.type ? "type-error" : undefined}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          {errors.type && (
            <p id="type-error" className={styles.error}>
              {errors.type.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block mb-1 font-medium">
            Category
          </label>
          <input
            id="category"
            {...register("category")}
            disabled={disabled}
            className={styles.input}
            placeholder="e.g. Food, Salary"
            aria-describedby={errors.category ? "category-error" : undefined}
          />
          {errors.category && (
            <p id="category-error" className={styles.error}>
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={
            disabled || !isValid || (selectedType === "expense" && !hasIncome)
          }
          className={
            !isValid || (selectedType === "expense" && !hasIncome)
              ? styles.button.disabled
              : styles.button.primary
          }
          title={
            selectedType === "expense" && !hasIncome
              ? "Add income first to enable expense submission"
              : disabled
              ? "Processing transaction..."
              : undefined
          }
        >
          {disabled ? "Adding..." : "Add Transaction"}
        </button>
      </form>
    );
  }
);
