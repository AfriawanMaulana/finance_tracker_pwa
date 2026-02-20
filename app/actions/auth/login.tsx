"use server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { createSession } from "@/lib/auth/session";
import { signInSchema } from "@/schemas/auth/sign-in.schema";
import { SignInState } from "@/types/auth";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function loginAction(
  _prevState: SignInState,
  formData: FormData
): Promise<SignInState> {
  const rawValues = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const result = signInSchema.safeParse(rawValues);
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const [user] = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      password: users.password,
    })
    .from(users)
    .where(eq(users.email, result.data.email));

  if (!user) {
    return {
      errors: { _form: ["Email or password is incorrect"] },
    };
  }

  const isValid = await bcrypt.compare(result.data.password, user.password);
  if (!isValid) {
    return {
      errors: { _form: ["Email or password is incorrect"] },
    };
  }

  await createSession(user.id);

  redirect("/");
}
