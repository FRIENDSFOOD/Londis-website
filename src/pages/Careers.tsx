import { usePageMeta } from "@/lib/usePageMeta";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Briefcase, CheckCircle2, Clock, Loader2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { hasFormEndpoint, isEmail, isUkPhone, submitForm } from "@/lib/submitForm";

const roles = [
  {
    title: "Store Assistant",
    type: "Full-time & part-time",
    points: ["Serving customers on the till", "Stocking shelves and rotating fresh produce", "Keeping the store clean and welcoming"],
  },
  {
    title: "Shift Supervisor",
    type: "Full-time",
    points: ["Leading the team during your shift", "Cash handling and opening/closing the store", "Supporting deliveries, ordering and compliance"],
  },
];

type Form = { name: string; email: string; phone: string; role: string; availability: string; message: string };
const empty: Form = { name: "", email: "", phone: "", role: "", availability: "", message: "" };

export default function Careers() {
  usePageMeta("Careers", "Join the team at Londis Bath Lane, Leicester. Store Assistant and Shift Supervisor roles, flexible hours.");
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [sending, setSending] = useState(false);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e: typeof errors = {};
    if (form.name.trim().length < 2) e.name = "Please enter your full name.";
    if (!isEmail(form.email)) e.email = "Please enter a valid email address.";
    if (!isUkPhone(form.phone)) e.phone = "Please enter a valid UK phone number.";
    if (!form.role) e.role = "Please choose a role.";
    if (!form.availability) e.availability = "Please tell us your availability.";
    if (form.message.length > 1000) e.message = "Please keep your message under 1000 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSending(true);
    try {
      const how = await submitForm("Job application", { ...form });
      if (how === "sent") {
        toast.success("Application sent! Thank you — we'll be in touch soon.");
        setForm(empty);
      } else toast.success("Opening WhatsApp — just press send to apply.");
    } catch {
      toast.error("Sorry, something went wrong. Please try again or call us.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Join the Londis team"
        intro="We're always keen to meet friendly, reliable people who love helping customers. Flexible hours available — perfect for students and parents too."
      />

      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            <h2 className="text-2xl">Current opportunities</h2>
            {roles.map((r, i) => (
              <Reveal key={r.title} delay={i * 100}>
                <div className="card p-6">
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-6 w-6 text-brand" />
                    <h3 className="text-xl">{r.title}</h3>
                  </div>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-ink/70">
                    <Clock className="h-4 w-4" /> {r.type}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {r.points.map((p) => (
                      <li key={p} className="flex gap-2 text-sm text-ink/75">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
            <p className="text-sm text-ink/70">
              Applicants must have the right to work in the UK. Roles involving the sale of age-restricted products
              require applicants to be 18 or over.
            </p>
          </div>

          <Reveal className="lg:col-span-3">
            <form onSubmit={onSubmit} noValidate className="card space-y-5 p-7 md:p-9">
              <h2 className="text-2xl">Apply now</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor="name">Full name *</label>
                  <input id="name" className="input" value={form.name} onChange={set("name")} autoComplete="name" />
                  {errors.name && <p className="error">{errors.name}</p>}
                </div>
                <div>
                  <label className="label" htmlFor="email">Email *</label>
                  <input id="email" type="email" className="input" value={form.email} onChange={set("email")} autoComplete="email" />
                  {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div>
                  <label className="label" htmlFor="phone">Phone *</label>
                  <input id="phone" type="tel" className="input" value={form.phone} onChange={set("phone")} autoComplete="tel" />
                  {errors.phone && <p className="error">{errors.phone}</p>}
                </div>
                <div>
                  <label className="label" htmlFor="role">Role *</label>
                  <select id="role" className="input" value={form.role} onChange={set("role")}>
                    <option value="">Select a role</option>
                    {roles.map((r) => <option key={r.title}>{r.title}</option>)}
                    <option>Any suitable role</option>
                  </select>
                  {errors.role && <p className="error">{errors.role}</p>}
                </div>
              </div>
              <div>
                <label className="label" htmlFor="availability">Availability *</label>
                <select id="availability" className="input" value={form.availability} onChange={set("availability")}>
                  <option value="">Select availability</option>
                  <option>Weekdays</option>
                  <option>Weekends</option>
                  <option>Evenings</option>
                  <option>Flexible / any</option>
                </select>
                {errors.availability && <p className="error">{errors.availability}</p>}
              </div>
              <div>
                <label className="label" htmlFor="message">Tell us about yourself</label>
                <textarea id="message" rows={5} className="input" value={form.message} onChange={set("message")} />
                {errors.message && <p className="error">{errors.message}</p>}
              </div>
              <button type="submit" disabled={sending} className="btn-primary w-full sm:w-auto">
                {sending && <Loader2 className="h-4 w-4 animate-spin" />} {hasFormEndpoint() ? "Send application" : "Send via WhatsApp"}
              </button>
              <p className="text-xs text-ink/70">
                By applying you agree to us using your details to process your application, as described in our privacy policy.
              </p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
