"use client";

import { useEffect, useMemo, useState } from "react";
import { LogEntry } from "./types/Logs";
import { fetchLogs } from "./utils/fetchLogs";
import { parseLogs } from "./utils/parseLog";
import Filters from "./components/Filters";
import LogTable from "./components/LogTable";
import { useDebounced } from "./hooks/useDebounce";
import { useRouter } from "next/navigation";
import ShadcnLogTable from "./components/ShadcnLogTable";

export default function HomePage() {

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filterLevel, setFilterLevel] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [changeTable, setChangeTable] = useState(true);


  const debouncedSearch = useDebounced(searchTerm, 300);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    fetchLogs()
      .then((rawLogs) => {
        const parsed = parseLogs(rawLogs);
        setLogs(parsed);
      })
      .catch((err) => console.error("Failed to load logs:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesLevel = filterLevel
        ? log.level === filterLevel.toUpperCase()
        : true;

      const matchesSearch = debouncedSearch
        ? [log.message, log.trace, log.authorId]
          .join(" ")
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase())
        : true;

      return matchesLevel && matchesSearch;
    });
  }, [logs, filterLevel, debouncedSearch]);

  return (
    <div className="bg-transparent p-6">
      <div className="w-full flex justify-end mb-4">
        <button
          onClick={() => {
            localStorage.removeItem("loggedIn");
            router.push("/login");
          }}
          className="w-24 bg-gray-400 text-white py-2 rounded-md hover:bg-gray-700 transition"
        >
          Logout
        </button>
      </div>
      <div className="max-w-6xl mx-auto bg-white/90 p-6 rounded-lg shadow space-y-4">
        <div className="flex justify-between items-center gap-3 bg-transparent p-2 rounded-lg shadow border border-gray-200">
          <div className="flex items-center gap-3">
            <img src="/betterstudio-logo.png" alt="Logo" className="w-30 h-30 object-contain" />
            <h1 className="text-3xl font-bold text-gray-800">Log Viewer</h1>
          </div>
          <div>
            <button
              onClick={() => {
                setChangeTable(!changeTable);
              }}
              className="w-40 bg-gray-400 text-white py-2 rounded-md hover:bg-gray-700 transition"
            >
              Show {(changeTable === true) ? "Shadcn " : "Tailwind "}Table
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center gap-3 bg-transparent p-2 rounded-lg shadow border border-gray-200">
          {/* Filter Dropdown */}
          <Filters level={filterLevel} onChange={setFilterLevel} />

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>
        {/* Loader / Table */}
        {loading ? (
          <div role="status" className="flex items-center justify-center min-h-[200px]">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <div className="bg-white/90 shadow rounded-lg border border-gray-200 max-h-[70vh] overflow-y-auto">
            {changeTable ? (
              <LogTable logs={filteredLogs} />) : (
              <ShadcnLogTable logs={filteredLogs} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
