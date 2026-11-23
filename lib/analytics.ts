/**
 * Safely dispatch a Google Analytics event if gtag is defined and loaded.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>,
): void {
  if (
    typeof window !== "undefined" &&
    typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag ===
      "function"
  ) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag(
      "event",
      eventName,
      params,
    );
  }
}
