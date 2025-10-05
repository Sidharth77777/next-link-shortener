import { redirect, notFound } from "next/navigation";
import { db } from "@/db/drizzle";
import { urls } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function Page({ params }) {
  const { shortUrl } = await params;

  //const host = process.env.NEXT_PUBLIC_HOST_URL;
  const fullShort = `/${shortUrl}`;

  const rows = await db.select().from(urls).where(eq(urls.shortUrl, fullShort));

  if (!rows || rows.length === 0) {
    return notFound();
  }

  redirect(rows[0].url);

  return null;
}
