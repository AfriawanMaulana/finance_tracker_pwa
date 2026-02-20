import { db } from "@/db";
import { desc, eq, sql } from "drizzle-orm";
import { getCurrentUser } from "../auth/session";
import { transactions } from "@/db/schema";

export async function getTransactions() {
  const user = await getCurrentUser();
  if (!user) return [];

  const data = await db
    .select()
    .from(transactions)
    .where(eq(transactions.userId, user.id))
    .orderBy(desc(transactions.date))
    .limit(20)
    .offset(0);

  return data;
}
