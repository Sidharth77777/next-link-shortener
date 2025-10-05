import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { urls } from "@/db/schema";
import { eq } from "drizzle-orm";

export function GET(request) {
  return NextResponse.redirect(new URL("/", request.url));
}

export async function POST(request) {
    try{
        const {url, preferredUrl} = await request.json();

        if (!url || !url.trim()) {
            return NextResponse.json({ error: "Missing URL" }, { status: 400 });
        }

        const shortUrl = `${process.env.NEXT_PUBLIC_HOST_URL}/${preferredUrl}`;

        const existing = await db.select().from(urls).where(eq(urls.shortUrl, shortUrl));
        if (existing.length > 0) {
            return NextResponse.json(
                { error: "Preferred short name already in use !" },
                { status: 409 }
            )
        }

        await db.insert(urls).values({
            url: url,
            shortUrl: shortUrl,
        })
        
        return NextResponse.json({shortUrl});
    } catch(err) {
        console.error("Error shortening urls !", err);
        return NextResponse.json({error:" Failed to create short url"}, {status: 500});
    }
}