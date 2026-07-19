import React, { useEffect, useState } from "react";

function getInitialTheme() {
    if (typeof window === "undefined") return "night";
    return localStorage.getItem("theme") === "day" ? "day" : "night";
}

/** Day / night switch. Sets `data-theme` on <html> (drives the CSS
 *  variables) and swaps NextUI's dark/light class. Persists choice. */
export default function ThemeToggle() {
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        const root = document.documentElement;
        root.dataset.theme = theme;
        root.classList.toggle("dark", theme === "night");
        root.classList.toggle("light", theme === "day");
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <button
            className="theme-toggle"
            onClick={() => setTheme(theme === "night" ? "day" : "night")}
            aria-label={theme === "night" ? "Switch to day mode" : "Switch to night mode"}
            title={theme === "night" ? "Day mode" : "Night mode"}
        >
            {theme === "night" ? (
                /* sun */
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
            ) : (
                /* moon */
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            )}
        </button>
    );
}
