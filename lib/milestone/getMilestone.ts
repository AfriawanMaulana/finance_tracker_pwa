import { db } from "@/db";
import { getCurrentUser } from "../auth/session";
import { milestones } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getMilestones() {
  const user = await getCurrentUser();
  if (!user) return [];

  const data = await db
    .select()
    .from(milestones)
    .where(eq(milestones.userId, user.id));

  return data;
}
