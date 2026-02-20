"use server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { signUpSchema } from "@/schemas/auth/sign-up.schema";
import { SignUpState } from "@/types/auth";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export async function signUpAction(
  _prevState: SignUpState,
  formData: FormData
): Promise<SignUpState> {
  const rawValues = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const result = signUpSchema.safeParse(rawValues);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      values: { name: rawValues.name, email: rawValues.email },
    };
  }

  try {
    const hashedPassword = await bcrypt.hash(result.data.password, 10);

    await db.insert(users).values({
      name: result.data.name,
      email: result.data.email,
      password: hashedPassword,
    });

    redirect("/login");
  } catch {
    return {
      errors: {
        _form: ["Something went wrong. Please try again."],
      },
      values: {
        name: result.data.name,
        email: result.data.email,
      },
    };
  }
}
