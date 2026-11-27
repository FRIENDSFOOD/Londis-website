import { site } from "@/config/site";

/** True when an email form service (e.g. Formspree) is configured. */
export const hasFormEndpoint = () => !!site.formEndpoint;

/**
 * Sends the form. With site.formEndpoint set (e.g. Formspree) it is emailed to the shop.
 * Without one, it opens WhatsApp with the message pre-filled, so nothing is ever lost.
 * Returns "sent" or "whatsapp".
 */
export async function submitForm(title: string, data: Record<string, string>): Promise<"sent" | "whatsapp"> {
  if (site.formEndpoint) {
    const res = await fetch(site.formEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ formType: title, ...data }),
    });
    if (!res.ok) throw new Error("Failed to send");
    return "sent";
  }
  const lines = [`*${title}* (from the website)`, ...Object.entries(data).filter(([, v]) => v.trim()).map(([k, v]) => `${label(k)}: ${v.trim()}`)];
  const url = `${site.whatsappHref}?text=${encodeURIComponent(lines.join("\n"))}`;
  window.open(url, "_blank", "noopener,noreferrer") || (window.location.href = url);
  return "whatsapp";
}

const label = (k: string) => k.charAt(0).toUpperCase() + k.slice(1);

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
export const isUkPhone = (v: string) => /^(\+44\s?|0)[\d\s]{9,13}$/.test(v.trim());
