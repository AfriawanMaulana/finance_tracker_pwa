import {
  pgTable,
  pgEnum,
  text,
  decimal,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

export const transactionTypeEnum = pgEnum("transaction_type", [
  "INCOME",
  "EXPENSE",
]);

export const milestoneTypeEnum = pgEnum("milestone_type", [
  "ON_TRACK",
  "AT_RISK",
  "COMPLETED",
]);

export const users = pgTable(
  "users",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    avatarUrl: text("avatar_url"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    emailIndex: index("users_email_index").on(table.email),
  })
);

export const sessions = pgTable(
  "sessions",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    hashedToken: text("hashed_token").notNull().unique(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    userIdIndex: index("sessions_user_id_index").on(table.userId),
    expiresIndex: index("sessions_expires_at_index").on(table.expiresAt),
  })
);

export const transactions = pgTable(
  "transactions",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    description: text("description"),
    amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
    type: transactionTypeEnum("type").notNull(),
    category: text("category").notNull(),
    date: timestamp("date", { withTimezone: true }).notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updateAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    userIdIndex: index("transactions_user_id_index").on(table.userId),
    dateIndex: index("transactions_date_index").on(table.date),
  })
);

export const milestones = pgTable(
  "milestones",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),

    targetAmount: decimal("target_amount", {
      precision: 15,
      scale: 2,
    }).notNull(),
    currentAmount: decimal("current_amount", { precision: 15, scale: 2 })
      .default("0")
      .notNull(),

    dueDate: timestamp("due_date", { withTimezone: true }),
    status: milestoneTypeEnum("status").default("ON_TRACK").notNull(),
    imageUrl: text("image_url"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    userIndex: index("milestones_user_id_index").on(table.userId),
  })
);
