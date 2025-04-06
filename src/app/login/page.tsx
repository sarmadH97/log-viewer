"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@logviewer.com");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Dummy validation
    if (email === "admin@logviewer.com" && password === "1234") {
      localStorage.setItem("loggedIn", "true");
      router.push("/");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white/90 p-8 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <div className="flex items-center gap-3">
          <img src="/betterstudio-logo.png" alt="Logo" className="w-20 h-20 object-contain" />
          <h1 className="text-2xl font-bold text-gray-800">Log Viewer Login</h1>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full border px-4 py-2 rounded-md"
          value={"admin@logviewer.com"}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border px-4 py-2 rounded-md"
          value={"1234"}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-gray-400 text-white py-2 rounded-md hover:bg-gray-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
