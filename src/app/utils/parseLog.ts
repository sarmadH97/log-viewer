// utils/parseLog.ts

import { LogEntry } from "../types/Logs";


export function parseLogs(rawLogs: string[]): LogEntry[] {
  return rawLogs.map((log) => {
    const [timestamp, message, level, trace, authorId] = log.split("|=|");
    return {
      timestamp,
      level: level.toUpperCase(),
      message,
      trace,
      authorId,
    };
  });
}
