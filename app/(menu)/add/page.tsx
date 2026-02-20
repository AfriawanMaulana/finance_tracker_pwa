"use client";
import { useState, useActionState } from "react";
import { addTransactionAction } from "@/app/actions/add-transaction";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const expenseCategories = [
  "Food & Drink",
  "Coffee",
  "Shopping",
  "Transportation",
  "Rent",
  "Vacation",
  "Investment",
  "Others Expense",
];

const incomeCategories = [
  "Salary",
  "Freelance",
  "Business Income",
  "Commission",
  "Bonus",
  "Other Income",
];

const initialState = {
  errors: {} as Record<string, string[]>,
};

export default function AddPage() {
  const [isIncome, setIsIncome] = useState(true);
  const [category, setCategory] = useState("");
  const [formState, formAction, isPending] = useActionState(
    addTransactionAction,
    initialState
  );

  return (
    <div className="p-6 flex w-full max-h-screen">
      <form action={formAction} className="flex flex-col w-full">
        {/* Hidden Input */}
        <input
          type="hidden"
          name="type"
          value={isIncome ? "INCOME" : "EXPENSE"}
        />
        <input type="hidden" name="category" value={category} />

        {/* Switch Type Button */}
        <div className="flex justify-between gap-2 items-center">
          <button
            type="button"
            onClick={() => setIsIncome(true)}
            className={`${
              isIncome ? "bg-primary text-darkbg" : "bg-slate-400/10"
            } p-4 rounded-xl w-full`}
          >
            Income
          </button>
          <button
            type="button"
            onClick={() => setIsIncome(false)}
            className={`${
              !isIncome ? "bg-primary text-darkbg" : "bg-slate-400/10"
            } p-4 rounded-xl w-full`}
          >
            Expense
          </button>
        </div>

        {/* Amount Input */}
        <div className="flex flex-col gap-6 justify-center mt-6 items-center">
          <h2>Amount</h2>
          <input
            type="number"
            name="amount"
            placeholder="0"
            min={0}
            className="text-center w-full text-4xl p-2 rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-8">
          {/* Select Category */}
          <div className="flex flex-col gap-2">
            <label>Category</label>
            <Select onValueChange={setCategory}>
              <SelectTrigger className="w-full flex py-7 text-xl">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {isIncome
                    ? incomeCategories.map((item, i) => (
                        <SelectItem key={i} className="text-xl" value={item}>
                          {item}
                        </SelectItem>
                      ))
                    : expenseCategories.map((item, i) => (
                        <SelectItem key={i} className="text-xl" value={item}>
                          {item}
                        </SelectItem>
                      ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Input Note  */}
          <div className="flex flex-col gap-2">
            <label>Note (Optional)</label>
            <Textarea
              name="description"
              className="line-clamp-6"
              maxLength={100}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-8 bg-primary hover:bg-primary/80 font-semibold p-4 rounded-xl"
        >
          {isPending ? "Saving..." : "Save Transaction"}
        </button>
      </form>
    </div>
  );
}
