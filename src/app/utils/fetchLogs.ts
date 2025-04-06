// src/utils/fetchLogs.ts
export async function fetchLogs(): Promise<string[]> {
    const res = await fetch("/api/logs");
    if (!res.ok) throw new Error("Failed to fetch logs");
    return res.json();
  }
  