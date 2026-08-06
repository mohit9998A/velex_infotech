"use client";

import { useEffect } from "react";

/**
 * Last-resort boundary: catches errors thrown by the root layout itself, where
 * `app/error.tsx` cannot help because the layout it renders inside is the
 * thing that failed.
 *
 * It therefore has to render its own <html> and <body>, and it cannot rely on
 * the site's CSS having loaded — so the styling here is inline on purpose.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[velex:global-error]", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#04040A",
          color: "#F0EEFF",
          fontFamily: "system-ui, sans-serif",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: "32rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.75rem", margin: "0 0 0.75rem" }}>
            Something went wrong
          </h1>
          <p style={{ color: "#8B87A8", margin: "0 0 1.75rem", lineHeight: 1.6 }}>
            Velex Infotech hit an unexpected error. Reloading usually fixes it.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              background: "#6B21FF",
              color: "#fff",
              border: 0,
              borderRadius: "0.75rem",
              padding: "0.75rem 1.5rem",
              fontSize: "0.95rem",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
          {error.digest && (
            <p style={{ color: "#5A5773", marginTop: "2rem", fontSize: "0.8rem" }}>
              Reference: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
