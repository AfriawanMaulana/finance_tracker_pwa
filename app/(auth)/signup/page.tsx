import { Metadata } from "next";
import { SignUpForm } from "@/components/SignUpForm";
import { authIsNotRequired } from "@/lib/auth/middleware";

export const metadata: Metadata = {
  title: "Sign Up - TerWallet",
  description: "Create an account in seconds",
};

export default async function Page() {
  await authIsNotRequired();
  return <SignUpForm />;
}
