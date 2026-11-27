import { site } from "@/config/site";

/**
 * Sends form data to site.formEndpoint (e.g. Formspree) if configured.
 * Without an endpoint it resolves after a short delay so the UI still works.
 */
export async function submitForm(data: Record<string, string>): Promise<void> {
  if (!site.formEndpoint) {
    await new Promise((r) => setTimeout(r, 600));
    return;
  }
  const res = await fetch(site.formEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to send");
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
export const isUkPhone = (v: string) => /^(\+44\s?|0)[\d\s]{9,13}$/.test(v.trim());
