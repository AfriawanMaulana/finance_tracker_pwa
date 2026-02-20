// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client"
  output   = "../app/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

model User {
  id  String @id @default(cuid())
  name  String?
  email String @unique
  password  String
  avatarUrl String?

  sessions    Session[]
  transactions Transaction[]
  milestones  Milestone[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email])
  @@map("users")
}

model Session {
  id        String   @id @default(cuid())
  userId    String
  hashedToken String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([expiresAt])
  @@map("sessions")
}

model Transaction {
  id String @id @default(cuid())
  userId String 
  title String
  description String?
  amount Decimal @db.Decimal(15, 2)
  type TransactionType
  category String
  date DateTime

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([date])
  @@map("transactions")
}

model Milestone {
  id String @id @default(cuid())
  userId String
  title String
  description String?
  targetAmount Decimal @db.Decimal(15, 2)
  currentAmount Decimal @default(0) @db.Decimal(15, 2)
  dueDate DateTime?
  status MilestoneStatus @default(ON_TRACK)
  imageUrl String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@map("milestones")
}

enum TransactionType {
  INCOME
  EXPENSE
}

enum MilestoneStatus {
  ON_TRACK
  AT_RISK
  COMPLETED
}