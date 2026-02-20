"use server";
import { db } from "@/db";
import { transactions } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth/session";
import { addTransactionSchema } from "@/schemas/add-transaction.schema";
import { AddTransactionState } from "@/types/transaction";
import { redirect } from "next/navigation";

export async function addTransactionAction(
  _prevState: AddTransactionState,
  formData: FormData
): Promise<AddTransactionState> {
  const result = addTransactionSchema.safeParse({
    amount: formData.get("amount"),
    category: formData.get("category") as string,
    type: formData.get("type") as string,
    description: formData.get("description") as string,
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const user = await getCurrentUser();
  if (!user) {
    return {
      errors: {
        _form: ["Unauthorized"],
      },
    };
  }

  const { amount, category, type, description } = result.data;
  await db.insert(transactions).values({
    userId: user.id,
    amount: String(amount),
    category,
    type,
    description,
    date: new Date(),
  });

  redirect("/");
}
