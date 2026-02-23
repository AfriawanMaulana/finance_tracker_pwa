"use server";
import { db } from "@/db";
import { milestones } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth/session";
import { supabase } from "@/supabase/client";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Create New Milestone
export async function createMilestoneAction(
  _prevState: { success: boolean },
  formData: FormData
) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const targetAmount = Number(formData.get("targetAmount"));
  const description = formData.get("description") as string | null;
  const dueDate = formData.get("dueDate") as string | null;

  const MAX_SIZE = 2 * 1024 * 1024;
  const imageFile = formData.get("image") as File | null;
  let imageUrl: string | null = null;

  if (imageFile) {
    if (imageFile.size > MAX_SIZE) {
      throw new Error("Image must be less then 2MB");
    }
    const ext = imageFile.name.split(".").pop();
    const path = `milestones/${user.id}-${crypto.randomUUID()}.${ext}`;

    const { error } = await supabase.storage
      .from("milestones")
      .upload(path, imageFile, {
        contentType: imageFile.type,
        upsert: false,
      });

    if (error) throw error;

    const { data } = supabase.storage.from("milestones").getPublicUrl(path);

    imageUrl = data.publicUrl;
  }

  const data = await db.insert(milestones).values({
    userId: user.id,
    title,
    targetAmount: String(targetAmount),
    description,
    dueDate: dueDate ? new Date(dueDate) : null,
    imageUrl,
  });

  if (!data) return { success: false };

  revalidatePath("/milestones");
  return { success: true };
}

// Update Milestone Balance
export async function updateCurrentBalance(
  _prevState: { success: boolean },
  formData: FormData
) {
  const amount = Number(formData.get("amount"));
  const id = String(formData.get("id"));
  if (!Number.isFinite(amount) && amount <= 0) return { success: false };

  await db
    .update(milestones)
    .set({
      currentAmount: sql`${milestones.currentAmount} + ${amount}`,
    })
    .where(eq(milestones.id, id));

  revalidatePath(`/milestones/${id}`);
  return { success: true };
}

// Delete Milestone
export async function deleteMilestone(id: string) {
  await db.delete(milestones).where(eq(milestones.id, id));

  console.log("Success Delete", id);
  redirect("/milestones");
}
