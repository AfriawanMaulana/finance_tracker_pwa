import { z } from "zod";

export const addTransactionSchema = z.object({
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  description: z.string().optional(),
  category: z.string(),
  type: z.enum(["INCOME", "EXPENSE"]),
});
