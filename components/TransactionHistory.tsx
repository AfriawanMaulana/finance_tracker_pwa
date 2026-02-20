import { getTransactions } from "@/lib/transaction/transaction-history";

import Link from "next/link";
import {
  UtensilsCrossed,
  Coffee,
  ShoppingBag,
  Car,
  Home,
  Plane,
  TrendingUp,
  CircleDollarSign,
  Wallet,
  Laptop,
  Building2,
  Handshake,
  Gift,
  PiggyBank,
  TrendingDown,
} from "lucide-react";

const icons = [
  { label: "Food & Drink", icon: UtensilsCrossed },
  { label: "Coffee", icon: Coffee },
  { label: "Shopping", icon: ShoppingBag },
  { label: "Transportation", icon: Car },
  { label: "Rent", icon: Home },
  { label: "Vacation", icon: Plane },
  { label: "Investment", icon: TrendingUp },
  { label: "Other Expense", icon: CircleDollarSign },
  { label: "Salary", icon: Wallet },
  { label: "Freelance", icon: Laptop },
  { label: "Business Income", icon: Building2 },
  { label: "Commission", icon: Handshake },
  { label: "Bonus", icon: Gift },
  { label: "Other Income", icon: PiggyBank },
];

export default async function TransactionHistory() {
  const transactions = await getTransactions();
  return (
    <div>
      <h2 className="font-bold mb-4">Transaction History</h2>

      <div className="flex flex-col gap-4 h-[50vh] overflow-y-auto">
        {transactions.map((trx) => (
          <Link
            key={trx.id}
            href={"#"}
            className="flex justify-between items-center"
          >
            <div className="flex gap-4 items-center">
              <span className="bg-slate-400/10 rounded-2xl border p-3">
                {icons.map(
                  (item) =>
                    item.label.toLowerCase() == trx.category.toLowerCase() && (
                      <item.icon
                        key={item.label}
                        className={`${
                          trx.type.toUpperCase() === "INCOME" && "text-primary"
                        }`}
                      />
                    )
                )}
              </span>
              <div>
                <p className="font-semibold">{trx.category}</p>
                <p className="text-sm text-muted-foreground">
                  {new Intl.DateTimeFormat("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(trx.date))}
                </p>
              </div>
            </div>
            <div className="text-sm flex gap-2 items-center">
              <p
                className={`${
                  trx.type.toUpperCase() === "INCOME" ? "text-primary/70" : ""
                }`}
              >
                {trx.type.toUpperCase() === "INCOME" ? "+" : "-"}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(Number(trx.amount))}
              </p>
              {/* {trx.type.toUpperCase() === "EXPENSE" ? (
                <TrendingDown size={20} color="red" />
              ) : (
                <TrendingUp size={20} color="green" />
              )} */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
