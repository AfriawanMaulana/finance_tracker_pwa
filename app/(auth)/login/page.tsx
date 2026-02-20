import { Metadata } from "next";
import { LoginForm } from "@/components/LoginForm";
import { authIsNotRequired } from "@/lib/auth/middleware";

export const metadata: Metadata = {
  title: "Login - TerWallet",
  description: "Login to your account in seconds",
};

export default async function Page() {
  await authIsNotRequired();
  return <LoginForm />;
}
