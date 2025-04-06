// src/app/api/logs/route.ts
import { NextResponse } from "next/server";

export async function GET() {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: "API key not set" }, { status: 500 });
    }

    const res = await fetch("https://challenges.betterstudio.io/logs", {
        headers: {
            "x-log-key": apiKey,
        },
    });

    if (!res.ok) {
        return NextResponse.json({ error: "Failed to fetch logs" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
}
