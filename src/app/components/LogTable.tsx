// components/LogTable.tsx

import { LogEntry } from "../types/Logs";

const levelColors: Record<string, string> = {
  INFO: "bg-blue-100 text-blue-800",
  WARN: "bg-yellow-100 text-yellow-800",
  ERROR: "bg-red-100 text-red-800",
  DEBUG: "bg-green-100 text-green-800",
  TRACE: "bg-purple-100 text-purple-800",
};

export default function LogTable({ logs }: { logs: LogEntry[] }) {
  return (
    <table className="min-w-full table-fixed text-sm text-left">
      <thead className="bg-gray-100 text-gray-700 font-semibold sticky top-0 z-20">
        <tr>
          <th className="px-4 py-3 w-40">Timestamp</th>
          <th className="px-4 py-3 w-24">Level</th>
          <th className="px-4 py-3">Message</th>
          <th className="px-4 py-3 w-64">Trace</th>
          <th className="px-4 py-3 w-64">Author ID</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-100">
        {logs.map((log, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            <td className="px-4 py-2 text-gray-600">{log.timestamp}</td>
            <td className="px-4 py-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${levelColors[log.level] || "bg-gray-100 text-gray-800"}`}>
                {log.level}
              </span>
            </td>
            <td className="px-4 py-2 text-gray-700">{log.message}</td>
            <td className="px-4 py-2 text-gray-500 truncate">{log.trace}</td>
            <td className="px-4 py-2 text-gray-500 truncate">{log.authorId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
