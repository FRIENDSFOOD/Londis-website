import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Loader2, Mail, MapPin, Navigation, Phone } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import OpeningHours from "@/components/OpeningHours";
import MapEmbed from "@/components/MapEmbed";
import { directionsUrl, site } from "@/config/site";
import { isEmail, submitForm } from "@/lib/submitForm";

type Form = { name: string; email: string; message: string };
const empty: Form = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [sending, setSending] = useState(false);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e: typeof errors = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!isEmail(form.email)) e.email = "Please enter a valid email address.";
    if (form.message.trim().length < 5) e.message = "Please enter a message.";
    else if (form.message.length > 1000) e.message = "Please keep your message under 1000 characters.";
    setErrors(e);
    if (Object.keys(e).length) return;

    setSending(true);
    try {
      await submitForm({ formType: "Contact", ...form });
      toast.success("Message sent! Thanks for getting in touch.");
      setForm(empty);
    } catch {
      toast.error("Sorry, something went wrong. Please try again or call us.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageHeader eyebrow="Contact Us" title="We'd love to hear from you" intro="Questions, product requests or feedback — drop us a message or pop into the store." />

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-3">
          <div className="space-y-6">
            <div className="card space-y-5 p-7">
              <a href={site.phoneHref} className="flex gap-4 hover:text-brand">
                <Phone className="h-6 w-6 shrink-0 text-brand" />
                <span><span className="block text-xs uppercase text-ink/50">Phone</span><span className="font-semibold">{site.phone}</span></span>
              </a>
              <a href={`mailto:${site.email}`} className="flex gap-4 hover:text-brand">
                <Mail className="h-6 w-6 shrink-0 text-brand" />
                <span><span className="block text-xs uppercase text-ink/50">Email</span><span className="font-semibold break-all">{site.email}</span></span>
              </a>
              <div className="flex gap-4">
                <MapPin className="h-6 w-6 shrink-0 text-brand" />
                <span><span className="block text-xs uppercase text-ink/50">Address</span><span className="font-semibold">{site.address.full}</span></span>
              </div>
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full">
                <Navigation className="h-4 w-4" /> Get Directions
              </a>
            </div>
            <OpeningHours />
          </div>

          <div className="space-y-10 lg:col-span-2">
            <form onSubmit={onSubmit} noValidate className="card space-y-5 p-7 md:p-9">
              <h2 className="text-2xl">Send us a message</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor="c-name">Name *</label>
                  <input id="c-name" className="input" value={form.name} onChange={set("name")} autoComplete="name" />
                  {errors.name && <p className="error">{errors.name}</p>}
                </div>
                <div>
                  <label className="label" htmlFor="c-email">Email *</label>
                  <input id="c-email" type="email" className="input" value={form.email} onChange={set("email")} autoComplete="email" />
                  {errors.email && <p className="error">{errors.email}</p>}
                </div>
              </div>
              <div>
                <label className="label" htmlFor="c-message">Message *</label>
                <textarea id="c-message" rows={6} className="input" value={form.message} onChange={set("message")} />
                {errors.message && <p className="error">{errors.message}</p>}
              </div>
              <button type="submit" disabled={sending} className="btn-primary">
                {sending && <Loader2 className="h-4 w-4 animate-spin" />} Send message
              </button>
            </form>
            <MapEmbed className="h-[380px]" />
          </div>
        </div>
      </section>
    </>
  );
}
