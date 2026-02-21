"use server";
import { db } from "@/db";
import { milestones } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth/session";
import { supabase } from "@/supabase/client";

export async function createMilestoneAction(formData: FormData) {
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

  await db.insert(milestones).values({
    userId: user.id,
    title,
    targetAmount: String(targetAmount),
    description,
    dueDate: dueDate ? new Date(dueDate) : null,
    imageUrl,
  });

  console.log("success");
}
