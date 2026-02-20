import { db } from "@/db";
import { transactions } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth/session";

export async function getTotalIncomeExpense() {
  const user = await getCurrentUser();
  if (!user) return { income: 0, expense: 0 };

  const [result] = await db
    .select({
      income: sql<number>`
        COALESCE(
          SUM(CASE WHEN ${transactions.type} = 'INCOME' THEN ${transactions.amount} ELSE 0 END),
          0
        )
      `,
      expense: sql<number>`
        COALESCE(
          SUM(CASE WHEN ${transactions.type} = 'EXPENSE' THEN ${transactions.amount} ELSE 0 END),
          0
        )
      `,
    })
    .from(transactions)
    .where(eq(transactions.userId, user.id));

  const balance = result.income - result.expense;

  return {
    income: result.income,
    expense: result.expense,
    currentBalance: balance,
  };
}
