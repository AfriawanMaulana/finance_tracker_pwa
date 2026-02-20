import { ToggleTheme } from "@/components/layout/ToggleTheme";
import TransactionHistory from "@/components/TransactionHistory";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { authIsRequired } from "@/lib/auth/middleware";
import { getCurrentUser } from "@/lib/auth/session";
import { getTotalIncomeExpense } from "@/lib/transaction/total-balance";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  await authIsRequired();
  const userData = await getCurrentUser();
  const totalBalance = await getTotalIncomeExpense();

  return (
    <div className="p-6 max-h-screen">
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <Avatar size="lg">
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <p className="font-bold text-xl">{userData?.name}</p>
        </div>
        <ToggleTheme />
      </div>

      {/* Balance */}
      <div className="border rounded-2xl mt-6 p-4 space-y-6 bg-slate-400/5">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">Main Wallet</Badge>
          <Link
            href="/wallet"
            className="bg-primary text-primary-foreground rounded-full p-2 flex items-center"
          >
            <MoveUpRight />
          </Link>
        </div>
        <div>
          <span className="text-sm text-muted-foreground">Total Balance</span>
          <p className="text-4xl font-bold mt-2">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(Number(totalBalance.currentBalance))}
          </p>
        </div>
      </div>

      {/* Transaction History */}
      <div className="mt-6">
        <TransactionHistory />
      </div>
    </div>
  );
}
