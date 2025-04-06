"use client";

import { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/Table";
import { LogEntry } from "../types/Logs";

type SortDirection = "asc" | "desc";

export default function ShadcnLogTable({ logs }: { logs: LogEntry[] }) {
  const [sortBy, setSortBy] = useState<keyof LogEntry>("timestamp");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const toggleSort = (field: keyof LogEntry) => {
    if (sortBy === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  const sortedLogs = [...logs].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];

    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="rounded-md border bg-white/90 overflow-auto max-h-[70vh]">
      <Table>
        <TableHeader className="bg-gray-100 sticky top-0 z-10">
          <TableRow>
            {["timestamp", "level", "message", "trace", "authorId"].map((field) => (
              <TableHead
                key={field}
                onClick={() => toggleSort(field as keyof LogEntry)}
                className="cursor-pointer select-none hover:bg-gray-200 transition-colors"
              >
                {field.toUpperCase()}{" "}
                {sortBy === field && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedLogs.map((log, index) => (
            <TableRow key={index}>
              <TableCell>{log.timestamp}</TableCell>
              <TableCell>{log.level}</TableCell>
              <TableCell>{log.message}</TableCell>
              <TableCell>{log.trace}</TableCell>
              <TableCell>{log.authorId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
