import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import HomePage from "../page"; // Adjust path if needed
import * as fetchModule from "../utils/fetchLogs"; // Adjust path if needed
import { mockLogs } from "../data/mockdata";

jest.mock("../utils/fetchLogs");

describe("Log Viewer", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders logs after fetch", async () => {
        (fetchModule.fetchLogs as jest.Mock).mockResolvedValue(
            mockLogs.map((log) =>
                `${log.timestamp}|=|${log.message}|=|${log.level}|=|${log.trace}|=|${log.authorId}`
            )
        );

        render(<HomePage />);
        expect(screen.getByText("Log Viewer")).toBeInTheDocument();

        // Wait for logs to appear
        await waitFor(() => {
            expect(screen.getByText("User logged in")).toBeInTheDocument();
            expect(screen.getByText("Error saving user")).toBeInTheDocument();
        });
    });

    it("filters by level", async () => {
        (fetchModule.fetchLogs as jest.Mock).mockResolvedValue(
            mockLogs.map((log) =>
                `${log.timestamp}|=|${log.message}|=|${log.level}|=|${log.trace}|=|${log.authorId}`
            )
        );

        render(<HomePage />);
        await waitFor(() => screen.getByText("User logged in"));

        fireEvent.change(screen.getByRole("combobox"), {
            target: { value: "ERROR" },
        });

        expect(screen.queryByText("User logged in")).not.toBeInTheDocument();
        expect(screen.getByText("Error saving user")).toBeInTheDocument();
    });

    it("filters by search input", async () => {
        (fetchModule.fetchLogs as jest.Mock).mockResolvedValue(
            mockLogs.map((log) =>
                `${log.timestamp}|=|${log.message}|=|${log.level}|=|${log.trace}|=|${log.authorId}`
            )
        );

        render(<HomePage />);
        await waitFor(() => screen.getByText("User logged in"));

        fireEvent.change(screen.getByPlaceholderText("Search logs..."), {
            target: { value: "error" },
        });

        await waitFor(() => {
            expect(screen.queryByText("User logged in")).not.toBeInTheDocument();
            expect(screen.getByText("Error saving user")).toBeInTheDocument();
        });

    });

    // it("shows loading spinner initially", async () => {
    //     (fetchModule.fetchLogs as jest.Mock).mockImplementation(
    //         () =>
    //             new Promise((resolve) => {
    //                 setTimeout(() => resolve([]), 1000);
    //             })
    //     );

    //     render(<HomePage />);
    //     expect(screen.getByRole("status")).toBeInTheDocument();

    //     // Wait for spinner to disappear
    //     await waitFor(() =>
    //         expect(screen.queryByRole("status")).not.toBeInTheDocument()
    //     );
    // });

    it("shows empty message when no logs match", async () => {
        (fetchModule.fetchLogs as jest.Mock).mockResolvedValue(
            mockLogs.map((log) =>
                `${log.timestamp}|=|${log.message}|=|${log.level}|=|${log.trace}|=|${log.authorId}`
            )
        );

        render(<HomePage />);
        await waitFor(() => screen.getByText("User logged in"));

        fireEvent.change(screen.getByPlaceholderText("Search logs..."), {
            target: { value: "zzzz" },
        });

        await waitFor(() => {
            expect(screen.queryByText("User logged in")).not.toBeInTheDocument();
            expect(screen.queryByText("Error saving user")).not.toBeInTheDocument();
        });

    });
});
