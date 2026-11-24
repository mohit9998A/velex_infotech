export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];
export type UtmParams = Partial<Record<UtmKey, string>>;

const STORAGE_KEY = "velex_utm_params";

/**
 * Captures UTM parameters from window.location.search into sessionStorage.
 * Runs on initial visit so UTM attribution is preserved across client navigation.
 */
export function captureUtmParams(): void {
  if (typeof window === "undefined") return;
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const existing = getStoredUtmParams();
    const fresh: UtmParams = { ...existing };
    let found = false;

    for (const key of UTM_KEYS) {
      const val = searchParams.get(key);
      if (val) {
        fresh[key] = val.slice(0, 100);
        found = true;
      }
    }

    if (found) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    }
  } catch {
    // sessionStorage may be blocked or full
  }
}

/**
 * Returns stored UTM parameters from sessionStorage if available.
 */
export function getStoredUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as UtmParams;
  } catch {
    return {};
  }
}
