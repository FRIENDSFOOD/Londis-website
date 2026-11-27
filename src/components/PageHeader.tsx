export default function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/5" />
      <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-white/5" />
      <div className="container relative py-16 md:py-20">
        <span className="mb-3 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
          {eyebrow}
        </span>
        <h1 className="text-4xl md:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-white/85">{intro}</p>}
      </div>
    </section>
  );
}
