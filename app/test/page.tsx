import { db } from "@/db";
import { users } from "@/db/schema";

export default async function Test() {
  const data = await db.select().from(users);
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
