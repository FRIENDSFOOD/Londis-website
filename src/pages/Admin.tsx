import { FormEvent, ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import type { Session } from "@supabase/supabase-js";
import { ArrowDown, ArrowUp, CalendarPlus, Copy, Loader2, LogOut, Plus, Save, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { defaultSettings, fetchSettings, saveSettings, useSettings, type Settings } from "@/lib/settings";
import type { SeasonalHours, Service } from "@/config/site";
import Logo from "@/components/Logo";
import { SERVICE_ICONS } from "@/components/ServiceLogo";

const todayISO = () => new Date().toISOString().slice(0, 10);

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    document.title = "Admin · Londis Bath Lane";
    return () => meta.remove();
  }, []);

  useEffect(() => {
    if (!supabase) return setChecking(false);
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container flex h-20 items-center justify-between">
          <Logo />
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm font-medium text-ink/70 hover:text-ink">View website</Link>
            {session && (
              <button onClick={() => supabase?.auth.signOut()} className="btn border border-gray-300 bg-white px-4 py-2 hover:bg-gray-100">
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="container max-w-4xl py-10">
        {!supabase ? <NotConnected /> : checking ? <Spinner /> : session ? <Editor email={session.user.email ?? ""} /> : <Login />}
      </main>
    </div>
  );
}

function Spinner() {
  return (
    <div className="grid place-items-center py-24">
      <Loader2 className="h-8 w-8 animate-spin text-ink/70" />
    </div>
  );
}

function NotConnected() {
  return (
    <div className="card space-y-3 p-8">
      <h1 className="text-2xl">Admin not connected yet</h1>
      <p className="text-ink/70">
        The admin area needs Supabase. Follow <strong>"Admin area (Supabase)"</strong> in the project README: create a
        free Supabase project, run <code>supabase/schema.sql</code>, then add <code>VITE_SUPABASE_URL</code> and{" "}
        <code>VITE_SUPABASE_ANON_KEY</code> to your <code>.env</code> file (or your host's environment settings).
      </p>
      <p className="text-ink/70">Until then the website uses the default hours and services from <code>src/config/site.ts</code>.</p>
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase!.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) toast.error("Sign in failed — check your email and password.");
  };
  return (
    <form onSubmit={submit} className="card mx-auto max-w-md space-y-5 p-8">
      <h1 className="text-2xl">Staff sign in</h1>
      <div>
        <label className="label" htmlFor="a-email">Email</label>
        <input id="a-email" type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required />
      </div>
      <div>
        <label className="label" htmlFor="a-pass">Password</label>
        <input id="a-pass" type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
      </div>
      <button className="btn-primary w-full" disabled={busy}>
        {busy && <Loader2 className="h-4 w-4 animate-spin" />} Sign in
      </button>
    </form>
  );
}

function Section({ title, hint, children, action }: { title: string; hint?: string; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="card p-6 md:p-8">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl">{title}</h2>
          {hint && <p className="mt-1 text-sm text-ink/70">{hint}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function validate(s: Settings): string | null {
  for (const h of s.hours) {
    if (!h.closed && (!h.open || !h.close)) return `${h.day}: enter opening and closing times.`;
    if (!h.closed && h.open >= h.close) return `${h.day}: closing time must be after opening time.`;
  }
  for (const x of s.seasonalHours) {
    const label = x.name || "A seasonal entry";
    if (!x.name.trim()) return "Every seasonal entry needs a name.";
    if (x.date === undefined && (!x.from || !x.to)) return `${label}: choose a start and end date.`;
    if (x.date === "") return `${label}: choose a date.`;
    if (x.from && x.to && x.from > x.to) return `${label}: end date is before start date.`;
    if (!x.closed && (!x.open || !x.close)) return `${label}: enter times or tick Closed.`;
    if (!x.closed && x.open! >= x.close!) return `${label}: closing time must be after opening time.`;
  }
  for (const sv of s.services) if (!sv.name.trim()) return "Every service needs a name.";
  return null;
}

function Editor({ email }: { email: string }) {
  const { reload } = useSettings();
  const [s, setS] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    fetchSettings()
      .then(setS)
      .catch(() => {
        toast.error("Couldn't load saved settings — showing defaults.");
        setS(defaultSettings);
      });
  }, []);

  if (!s) return <Spinner />;

  const update = (fn: (d: Settings) => Settings) => {
    setS((cur) => (cur ? fn(structuredClone(cur)) : cur));
    setDirty(true);
  };

  const save = async () => {
    const err = validate(s);
    if (err) return toast.error(err);
    setSaving(true);
    try {
      await saveSettings(s);
      await reload();
      setDirty(false);
      toast.success("Saved — the website is updated.");
    } catch (e) {
      console.error(e);
      toast.error("Save failed. Is this email listed as an admin in Supabase?");
    } finally {
      setSaving(false);
    }
  };

  const setSeasonal = (i: number, patch: Partial<SeasonalHours>) =>
    update((d) => {
      d.seasonalHours[i] = { ...d.seasonalHours[i], ...patch };
      return d;
    });
  const setService = (i: number, patch: Partial<Service>) =>
    update((d) => {
      d.services[i] = { ...d.services[i], ...patch };
      return d;
    });
  const moveService = (i: number, dir: -1 | 1) =>
    update((d) => {
      const j = i + dir;
      if (j < 0 || j >= d.services.length) return d;
      [d.services[i], d.services[j]] = [d.services[j], d.services[i]];
      return d;
    });

  return (
    <div className="space-y-8 pb-28">
      <div>
        <h1 className="text-3xl">Website settings</h1>
        <p className="mt-1 text-sm text-ink/70">Signed in as {email}. Changes go live as soon as you press Save.</p>
      </div>

      {/* WEEKLY HOURS */}
      <Section
        title="Weekly opening hours"
        hint="Your normal hours, shown every week."
        action={
          <button
            className="btn border border-gray-300 bg-white px-4 py-2 hover:bg-gray-100"
            onClick={() =>
              update((d) => {
                const mon = d.hours.find((h) => h.day === "Monday")!;
                d.hours = d.hours.map((h) => (["Saturday", "Sunday"].includes(h.day) ? h : { ...mon, day: h.day }));
                return d;
              })
            }
          >
            <Copy className="h-4 w-4" /> Copy Monday to weekdays
          </button>
        }
      >
        <div className="divide-y divide-gray-100">
          {s.hours.map((h, i) => (
            <div key={h.day} className="grid grid-cols-[6.5rem_1fr] items-center gap-3 py-3 sm:grid-cols-[8rem_auto_1fr]">
              <span className="font-semibold">{h.day}</span>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="h-5 w-5 accent-ink"
                  checked={!!h.closed}
                  onChange={(e) => update((d) => ((d.hours[i].closed = e.target.checked), d))}
                />
                Closed
              </label>
              {!h.closed && (
                <div className="col-span-2 flex items-center gap-2 sm:col-span-1">
                  <input type="time" className="input max-w-[9rem]" value={h.open} onChange={(e) => update((d) => ((d.hours[i].open = e.target.value), d))} aria-label={`${h.day} opening time`} />
                  <span className="text-ink/70">to</span>
                  <input type="time" className="input max-w-[9rem]" value={h.close} onChange={(e) => update((d) => ((d.hours[i].close = e.target.value), d))} aria-label={`${h.day} closing time`} />
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* SEASONAL HOURS */}
      <Section
        title="Seasonal & holiday hours"
        hint="Shown on the site 30 days before, with a banner 14 days before. They replace normal hours on the day and disappear once the date has passed."
        action={
          <button
            className="btn-primary px-4 py-2"
            onClick={() => update((d) => (d.seasonalHours.push({ name: "", date: todayISO(), open: "09:00", close: "21:00" }), d))}
          >
            <CalendarPlus className="h-4 w-4" /> Add
          </button>
        }
      >
        {s.seasonalHours.length === 0 && <p className="text-sm text-ink/70">No seasonal hours yet.</p>}
        <div className="space-y-4">
          {s.seasonalHours.map((x, i) => {
            const isRange = x.date === undefined;
            const end = x.date ?? x.to ?? "";
            const past = !!end && end < todayISO();
            return (
              <div key={i} className={`rounded-xl border p-4 ${past ? "border-gray-200 bg-gray-50 opacity-70" : "border-gray-200"}`}>
                <div className="flex flex-wrap items-center gap-3">
                  <input className="input flex-1 min-w-[12rem]" placeholder="e.g. Christmas Day" value={x.name} onChange={(e) => setSeasonal(i, { name: e.target.value })} aria-label="Name" />
                  {past && <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold">Past</span>}
                  <button className="grid h-10 w-10 place-items-center rounded-full text-ink/70 hover:bg-red-50 hover:text-red-700" onClick={() => update((d) => (d.seasonalHours.splice(i, 1), d))} aria-label="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                  <select
                    className="input w-auto"
                    value={isRange ? "range" : "single"}
                    onChange={(e) =>
                      e.target.value === "range"
                        ? setSeasonal(i, { date: undefined, from: x.date || todayISO(), to: x.date || todayISO() })
                        : setSeasonal(i, { date: x.from || todayISO(), from: undefined, to: undefined })
                    }
                    aria-label="Single day or date range"
                  >
                    <option value="single">Single day</option>
                    <option value="range">Date range</option>
                  </select>
                  {isRange ? (
                    <>
                      <input type="date" className="input w-auto" value={x.from ?? ""} onChange={(e) => setSeasonal(i, { from: e.target.value })} aria-label="From" />
                      <span className="text-ink/70">to</span>
                      <input type="date" className="input w-auto" value={x.to ?? ""} onChange={(e) => setSeasonal(i, { to: e.target.value })} aria-label="To" />
                    </>
                  ) : (
                    <input type="date" className="input w-auto" value={x.date} onChange={(e) => setSeasonal(i, { date: e.target.value })} aria-label="Date" />
                  )}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="h-5 w-5 accent-ink" checked={!!x.closed} onChange={(e) => setSeasonal(i, { closed: e.target.checked, open: x.open || "09:00", close: x.close || "21:00" })} />
                    Closed all day
                  </label>
                  {!x.closed && (
                    <>
                      <input type="time" className="input w-auto" value={x.open ?? ""} onChange={(e) => setSeasonal(i, { open: e.target.value })} aria-label="Opens" />
                      <span className="text-ink/70">to</span>
                      <input type="time" className="input w-auto" value={x.close ?? ""} onChange={(e) => setSeasonal(i, { close: e.target.value })} aria-label="Closes" />
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* SERVICES */}
      <Section
        title="In-store services"
        hint="Untick 'Show on website' to hide a service without deleting it. Logos are files in public/logos."
        action={
          <button
            className="btn-primary px-4 py-2"
            onClick={() => update((d) => (d.services.push({ id: `svc-${Date.now()}`, name: "", description: "", enabled: true }), d))}
          >
            <Plus className="h-4 w-4" /> Add service
          </button>
        }
      >
        <div className="space-y-4">
          {s.services.map((sv, i) => (
            <div key={sv.id} className="rounded-xl border border-gray-200 p-4">
              <div className="flex flex-wrap items-center gap-3">
                <input className="input flex-1 min-w-[12rem]" placeholder="Service name" value={sv.name} onChange={(e) => setService(i, { name: e.target.value })} aria-label="Service name" />
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="h-5 w-5 accent-ink" checked={sv.enabled} onChange={(e) => setService(i, { enabled: e.target.checked })} />
                  Show on website
                </label>
                <div className="flex">
                  <button className="grid h-10 w-10 place-items-center rounded-full text-ink/70 hover:bg-gray-100 disabled:opacity-30" disabled={i === 0} onClick={() => moveService(i, -1)} aria-label="Move up"><ArrowUp className="h-4 w-4" /></button>
                  <button className="grid h-10 w-10 place-items-center rounded-full text-ink/70 hover:bg-gray-100 disabled:opacity-30" disabled={i === s.services.length - 1} onClick={() => moveService(i, 1)} aria-label="Move down"><ArrowDown className="h-4 w-4" /></button>
                  <button className="grid h-10 w-10 place-items-center rounded-full text-ink/70 hover:bg-red-50 hover:text-red-700" onClick={() => update((d) => (d.services.splice(i, 1), d))} aria-label="Delete service"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              <textarea className="input mt-3" rows={2} placeholder="Short description" value={sv.description} onChange={(e) => setService(i, { description: e.target.value })} aria-label="Description" />
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <input className="input" placeholder="Logo file name, e.g. paypoint.png (optional)" value={sv.logo ?? ""} onChange={(e) => setService(i, { logo: e.target.value.trim() || undefined })} aria-label="Logo file name" />
                <select className="input" value={sv.icon ?? ""} onChange={(e) => setService(i, { icon: e.target.value || undefined })} aria-label="Icon if no logo">
                  <option value="">Icon if no logo: default</option>
                  {Object.keys(SERVICE_ICONS).map((k) => (
                    <option key={k} value={k}>Icon: {k}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* SAVE BAR */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-white/95 backdrop-blur">
        <div className="container flex max-w-4xl items-center justify-between gap-4 py-4">
          <span className="text-sm text-ink/70">{dirty ? "You have unsaved changes" : "All changes saved"}</span>
          <button className="btn-primary" onClick={save} disabled={saving || !dirty}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
