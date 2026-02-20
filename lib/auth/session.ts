import { cookies } from "next/headers";
import { db } from "@/db";
import { eq, and, gt } from "drizzle-orm";
import { SESSION_COOKIE, sha256, generateToken } from "./utils";
import { sessions, users } from "@/db/schema";

export async function createSession(userId: string) {
  const token = generateToken();
  const hashedToken = sha256(token);

  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  await db.insert(sessions).values({
    userId,
    hashedToken,
    expiresAt,
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    await db.delete(sessions).where(eq(sessions.hashedToken, sha256(token)));
  }

  cookieStore.set(SESSION_COOKIE, "", {
    path: "/",
    expires: new Date(0),
  });
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) return null;
  const tokenHash = sha256(token);

  const [session] = await db
    .select({
      userId: sessions.userId,
      hashedToken: sessions.hashedToken,
      expiresAt: sessions.expiresAt,
    })
    .from(sessions)
    .where(eq(sessions.hashedToken, tokenHash));

  if (!session) return null;

  if (session.expiresAt < new Date()) {
    await db.delete(sessions).where(eq(sessions.hashedToken, tokenHash));
    (await cookies()).delete(SESSION_COOKIE);
  }

  const [user] = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      avatarUrl: users.avatarUrl,
    })
    .from(sessions)
    .innerJoin(users, eq(users.id, sessions.userId))
    .where(
      and(
        eq(sessions.hashedToken, tokenHash),
        gt(sessions.expiresAt, new Date())
      )
    );

  return user ?? null;
}
