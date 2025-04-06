// src/data/mockLogs.ts

import { LogEntry } from "../types/Logs";

export const mockLogs: LogEntry[] = [
  {
    timestamp: "2025-04-01T12:00:00Z",
    message: "User logged in",
    level: "INFO",
    trace: "AuthService:LoginController",
    authorId: "abc-123",
  },
  {
    timestamp: "2025-04-01T12:00:01Z",
    message: "Error saving user",
    level: "ERROR",
    trace: "UserService:SaveController",
    authorId: "xyz-456",
  },
  {
    timestamp: "2025-03-28T14:13:02.399",
    message: "User updated",
    level: "WARN",
    trace: "ModelsService:AuthController",
    authorId: "f9f3106a-2244-41d1-6cf0-529391791a0b",
  },
  {
    timestamp: "2025-03-25T14:13:02.421",
    message: "Login failed: no such user",
    level: "ERROR",
    trace: "AuthService:ModelsController",
    authorId: "9266f9a9-28d8-e9ae-7b6b-5dca4086803b",
  },
  {
    timestamp: "2025-03-26T14:13:02.421",
    message: "User deleted",
    level: "TRACE",
    trace: "ModelsService:AuthController",
    authorId: "4ea49910-83fc-0f26-9643-b25d614bd79a",
  },
  {
    timestamp: "2025-03-24T14:13:02.421",
    message: "Login failed: Wrong password",
    level: "DEBUG",
    trace: "AuthService:AuthController",
    authorId: "5b8ac04d-37db-5135-07f5-dec2798aea14",
  },
  {
    timestamp: "2025-03-24T14:13:02.421",
    message: "User updated",
    level: "TRACE",
    trace: "AuthService:UserController",
    authorId: "858e5de0-94a7-4362-3249-b539fe197243",
  },
];
